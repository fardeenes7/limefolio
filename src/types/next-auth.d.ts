import { type DefaultSession } from "next-auth";

/**
 * User profile data from Django backend
 */
export interface BackendUser {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
    name?: string;
    picture?: string;
    image?: string;
}

/**
 * Response from Django social token exchange endpoint
 */
export interface SocialTokenResponse {
    access: string;
    refresh: string;
}

/**
 * Response from Django token refresh endpoint
 */
export interface TokenRefreshResponse {
    access: string;
    refresh?: string;
}

/**
 * Extend NextAuth types to include our custom fields
 */
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        access_token?: string;
        refresh_token?: string;
        user: BackendUser & DefaultSession["user"];
    }

    /**
     * The shape of the JWT token stored in the session
     */
    interface JWT {
        access_token?: string;
        refresh_token?: string;
        expires_at?: number;
        user?: BackendUser;
    }
}
