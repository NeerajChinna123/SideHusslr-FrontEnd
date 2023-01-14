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
          `${process.env.SIDEHUSSLR_API}/login`,
          payload,
          customConfig
        );

        const user = await res.data;
        if (user?.success == false) {
          throw new Error(user.error);
        }
        // If no error and we have user data, return it
        if (res?.data?.success == true) {
          console.log("user : ", user);
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // jwt: { encryption: false },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user, account}) {
      if (account && user) {
        return {
          ...token,
          ...user,
          accessToken: user.token,
        };
      }
      return token;
    },
    async session({ session,user, token }) {
      return {...token};
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
