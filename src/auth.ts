import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import NextAuth, { type DefaultSession } from 'next-auth';

async function convertToken(backend: string, token: string) {
  const res = await fetch(process.env.API_BASE_URL + 'auth/convert-token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      backend: backend,
      grant_type: 'convert_token',
      client_id: process.env.AUTH_CLIENT_ID,
      // client_secret: process.env.AUTH_CLIENT_SECRET,
      token: token
    })
  });
  const data = await res.json();
  if (!res.ok) {
    return;
  }
  return data;
}

async function getUserProfile(email: string, token: string) {
  const res = await fetch(process.env.API_BASE_URL + 'user/?email=' + email, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    return;
  }
  if (data.count > 0) {
    return data.results[0];
  }
  return null;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google({
      profile(profile) {
        return profile;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        //call our custom api server
        if (account.provider === 'google') {
          const data = await convertToken(
            'google-oauth2',
            account.access_token as string
          );
          if (data.user.email) {
            const user = await getUserProfile(
              data.user.email,
              data.access_token
            );
            if (user) {
              token.access_token = data.access_token;
              token.refresh_token = data.refresh_token;
              token.user = user;
              token.expires_in = new Date().getTime() / 1000 + data.expires_in; //add seconds to current time
              return token;
            }
          }
        }
      } else if (Number(token.expires_in) * 1000 < new Date().getTime()) {
        //refresh token
        const res = await fetch(
          process.env.API_BASE_URL + 'auth/refresh-token/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refresh_token: token.refresh_token,
              client_id: process.env.AUTH_CLIENT_ID
            })
          }
        );
        const data = await res.json();
        if (res.ok) {
          token.access_token = data.access_token;
          token.refresh_token = data.refresh_token;
          token.expires_in = new Date().getTime() / 1000 + data.expires_in; //add seconds to current time
        }
      }
      //updating token user data
      if (token) {
        const user = await getUserProfile(
          token.email as string,
          token.access_token as string
        );
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
        session.access_token = token.access_token as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
});
