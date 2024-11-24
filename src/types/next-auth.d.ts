import NextAuth, { type DefaultSession } from 'next-auth';
import AdapterUser from 'next-auth/adapters';
declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string;
      picture: string;
      is_active: boolean;
    } & DefaultSession['user'];
    access_token: string;
  }
}
