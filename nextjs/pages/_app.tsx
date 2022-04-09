import type { AppProps } from "next/app";
import "../app.css";
import { Provider } from "react-redux";
import store from "../state";
import { ThemeProvider } from "styled-components";
import { appTheme } from "../styles";
import Layout from "./layout";
import dynamic from "next/dynamic";
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
