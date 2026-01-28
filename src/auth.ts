import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
                },
            },
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // On sign in, get access token from Django backend
            if (account && profile) {
                try {
                    const response = await fetch(
                        `${process.env.API_URL}/api/auth/convert-token`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                grant_type: "convert_token",
                                client_id: process.env.GOOGLE_CLIENT_ID, // or GITHUB based on provider
                                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                                backend: account.provider, // 'google-oauth2' or 'github'
                                token: account.access_token,
                            }),
                        },
                    );

                    if (response.ok) {
                        const data = await response.json();
                        token.accessToken = data.access_token;
                        token.refreshToken = data.refresh_token;
                    }
                } catch (error) {
                    console.error("Error converting token:", error);
                }
            }

            return token;
        },
        async session({ session, token }) {
            // Add access token to session
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
});
