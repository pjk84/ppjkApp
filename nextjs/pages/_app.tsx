import type { AppProps } from "next/app";
import "../app.css";
import { Provider } from "react-redux";
import store from "../state";
import Layout from "./layout";
import ThemeWrapper from "../components/ThemeWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeWrapper>
    </Provider>
  );
}

export default MyApp;
