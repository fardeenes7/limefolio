import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import type {
  BackendUser,
  SocialTokenResponse,
  TokenRefreshResponse
} from '@/types/next-auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Exchange social OAuth token (Google or GitHub) for Django JWT tokens
 */
async function exchangeSocialToken(
  provider: 'google' | 'github',
  accessToken: string
): Promise<SocialTokenResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/auth/social/${provider}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: accessToken
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`${provider} token exchange failed:`, errorText);
      return null;
    }

    const data: SocialTokenResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error exchanging ${provider} token:`, error);
    return null;
  }
}

/**
 * Refresh Django JWT access token
 */
async function refreshAccessToken(
  refreshToken: string
): Promise<TokenRefreshResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    });

    if (!res.ok) {
      console.error('Token refresh failed:', await res.text());
      return null;
    }

    const data: TokenRefreshResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

/**
 * Get user profile from Django backend
 */
async function getUserProfile(
  accessToken: string
): Promise<BackendUser | null> {
  try {
    const res = await fetch(`${API_URL}/api/auth/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      console.error('Failed to get user profile:', await res.text());
      return null;
    }

    const data: BackendUser = await res.json();
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        console.log('Initial sign in with provider:', account.provider);

        // Exchange OAuth token for Django JWT
        let backendData = null;

        if (
          (account.provider === 'google' || account.provider === 'github') &&
          account.access_token
        ) {
          backendData = await exchangeSocialToken(
            account.provider,
            account.access_token
          );
        }

        if (backendData && backendData.access && backendData.refresh) {
          // Get user profile from backend
          const userProfile = await getUserProfile(backendData.access);

          if (userProfile) {
            token.access_token = backendData.access;
            token.refresh_token = backendData.refresh;
            token.user = userProfile;
            // JWT tokens from Django expire in 60 minutes by default
            token.expires_at = Math.floor(Date.now() / 1000) + 60 * 60;

            console.log('Successfully authenticated with backend');
            return token;
          }
        }

        console.error('Failed to authenticate with backend');
        return token;
      }

      // Check if token needs refresh (5 minutes before expiry)
      const now = Math.floor(Date.now() / 1000);
      if (
        typeof token.expires_at === 'number' &&
        token.expires_at - now < 5 * 60
      ) {
        console.log('Token expiring soon, refreshing...');

        if (typeof token.refresh_token === 'string') {
          const refreshedData = await refreshAccessToken(token.refresh_token);

          if (refreshedData && refreshedData.access) {
            token.access_token = refreshedData.access;
            if (refreshedData.refresh) {
              token.refresh_token = refreshedData.refresh;
            }
            token.expires_at = Math.floor(Date.now() / 1000) + 60 * 60;

            // Update user profile
            const userProfile = await getUserProfile(refreshedData.access);
            if (userProfile) {
              token.user = userProfile;
            }

            console.log('Token refreshed successfully');
            return token;
          }

          console.error('Failed to refresh token');
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Safely assign token properties with type guards
        if (typeof token.access_token === 'string') {
          session.access_token = token.access_token;
        }
        if (typeof token.refresh_token === 'string') {
          session.refresh_token = token.refresh_token;
        }
        if (token.user) {
          session.user = {
            ...session.user,
            ...token.user
          };
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
});
