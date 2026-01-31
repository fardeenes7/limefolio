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
                        `${process.env.API_URL}/api/auth/convert-token/`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                grant_type: "convert_token",
                                client_id: process.env.API_CLIENT_ID!,
                                backend:
                                    account.provider === "google"
                                        ? "google-oauth2"
                                        : account.provider,
                                token: account.access_token,
                            }),
                        },
                    );

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        token.accessToken = data.access_token;
                        token.refreshToken = data.refresh_token;
                        token.expiresAt = Date.now() + data.expires_in * 1000;
                    } else {
                        throw await response.json();
                    }
                } catch (error) {
                    console.error("Error converting token:", error);
                    throw error;
                }
            } else if (Date.now() < (token.expiresAt as number)) {
                // If the access token has not expired yet, return it
                return token;
            } else {
                // If the access token has expired, try to update it
                try {
                    const response = await fetch(
                        `${process.env.API_URL}/api/auth/token`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                grant_type: "refresh_token",
                                client_id: process.env.API_CLIENT_ID!,
                                client_secret:
                                    process.env.API_CLIENT_SECRET! || "ssss",
                                refresh_token: token.refreshToken,
                            }),
                        },
                    );

                    const data = await response.json();

                    if (!response.ok) throw data;

                    return {
                        ...token,
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token ?? token.refreshToken,
                        expiresAt: Date.now() + data.expires_in * 1000,
                    };
                } catch (error) {
                    console.error("Error refreshing Access Token", error);
                    return {
                        ...token,
                        error: "RefreshAccessTokenError",
                    };
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
        signIn: "/login",
        error: "/login",
    },
});
