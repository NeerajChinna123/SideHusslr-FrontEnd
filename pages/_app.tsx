import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { store } from "../store/store";
import { Provider as ReduxProvider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <RWBProvider>
          <Component {...pageProps} />
        </RWBProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
