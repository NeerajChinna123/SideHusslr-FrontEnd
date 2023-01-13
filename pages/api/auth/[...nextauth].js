import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };
        const customConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post(
          "https://sidehusslr.cleverapps.io/login",
          payload,
          customConfig
        );

        const user = await res.data;
        if (user?.success == false) {
          throw new Error(user.error);
        }
        // If no error and we have user data, return it
        if (res?.data?.success == true) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
