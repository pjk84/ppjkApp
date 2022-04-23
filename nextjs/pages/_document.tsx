import { Html, Main, Head, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="devicon.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
