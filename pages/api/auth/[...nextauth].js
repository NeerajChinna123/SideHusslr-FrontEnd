import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken

    axios.defaults.withCredentials = true;

    const payload = {
      accessToken: tokenObject.accessToken,
      refreshToken: tokenObject.refreshToken,
    };

    console.log("tokenobj : ", tokenObject);

    const customConfig = {
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        Authorization: `Bearer ${tokenObject.accessToken}`,
      },
    };

    const tokenResponse = await axios.post(
      `${process.env.SIDEHUSSLR_TEST_API}/auth/refresh`,
      payload,
      customConfig
    );

    console.log("token-res : ", tokenResponse);


    return {
      ...tokenObject,
      accessToken: tokenResponse.data.token,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    console.log("err - message", error.message);
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
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
            const response = await axios.post(
              `${process.env.SIDEHUSSLR_TEST_API}/auth/login`,
              payload,
              customConfig
            );

            const cookies = response.headers["set-cookie"];

            res.setHeader("Set-Cookie", cookies);

            console.log("re", response);

            const user = await response.data;

            if (response?.data?.success == false) {
              throw new Error(user.message);
            }
            // If no error and we have user data, return it
            if (response?.data?.success == true) {
              return user;
            }
            // Work with the response...
          } catch (err) {
            // Handle error
            console.log("err", err.response);
            throw new Error(err.response.data.message);
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
        console.log("acc-to-u :", user);
        if (account && user) {
          return {
            ...token,
            ...user,
            accessToken: user.token,
            refreshToken: user.refreshToken,
            accessTokenExpiry: user.accessTokenExpiry,
          };
        }

        const shouldRefreshTime = Math.round(
          token.accessTokenExpiry - Date.now()
        );

        // const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 60 * 1000) - Date.now());

        if (shouldRefreshTime > 0) {
          return token;
        }

        console.log("reque ");

        token = refreshAccessToken(token);

        return token;
      },
      async session({ session, user, token }) {
        return { ...token };
      },
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === "development",
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
