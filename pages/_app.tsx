import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { store } from "../store/store";
import { useState } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import RefreshTokenHandler from "../lib/hooks/refreshTokenHandler";
// import { StyledEngineProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  const [interval, setInterval] = useState(0);
  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <ReduxProvider store={store}>
        <RWBProvider>
          {/* <StyledEngineProvider injectFirst> */}
            <Component {...pageProps} />
            <RefreshTokenHandler setInterval={setInterval} />
          {/* </StyledEngineProvider> */}
        </RWBProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
