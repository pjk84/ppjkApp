import type { AppProps } from "next/app";
import "../app.css";
import { Provider } from "react-redux";
import store from "../state";
import { ThemeProvider } from "styled-components";
import { appTheme } from "../styles";
import Layout from "./layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
