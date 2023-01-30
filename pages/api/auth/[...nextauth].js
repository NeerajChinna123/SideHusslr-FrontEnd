import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";



async function refreshAccessToken(tokenObject) {
  try {
      // Get a new set of tokens with a refreshToken
      const tokenResponse = await axios.post(YOUR_API_URL + 'auth/refreshToken', {
          token: tokenObject.refreshToken
      });

      return {
          ...tokenObject,
          accessToken: tokenResponse.data.accessToken,
          accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
          refreshToken: tokenResponse.data.refreshToken
      }
  } catch (error) {
      return {
          ...tokenObject,
          error: "RefreshAccessTokenError",
      }
  }
}


const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        async authorize(credentials, req,res) {
          const payload = {
            username: credentials.username,
            password: credentials.password,
          };
          const customConfig = {
            headers: {
              "Content-Type": "application/json",
            },
          };
  
          try {
            const res = await axios.post(
              `${process.env.SIDEHUSSLR_TEST_API}/auth/login`,
              payload,
              customConfig
            );
  
            const user = await res.data;
            if (res?.data?.success == false) {
              throw new Error(user.error);
            }
            // If no error and we have user data, return it
            if (res?.data?.success == true) {
              return user;
            }
            // Work with the response...
          } catch (err) {
            // Handle error
            console.log(err);
            return null;
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
      async jwt({ token, user, account }) {
        if (account && user) {
          return {
            ...token,
            ...user,
            accessToken: user.token,
          };
        }
        return token;
      },
      async session({ session, user, token }) {
        return { ...token };
      },
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === "development",
  }
}

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}