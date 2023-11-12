import type { AppProps } from "next/app";
import "../app.css";
import { Provider } from "react-redux";
import store from "../state";
import Layout from "./layout";
import ThemeWrapper from "../components/ThemeWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }: AppProps) {
  const googleAuthClientId =
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || "";

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleAuthClientId}>
        ;
        <ThemeWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeWrapper>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default MyApp;
