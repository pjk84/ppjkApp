import type { NextPage } from "next";
import Logo from "../components/Header";
import Login from "../components/login";
import { Footer, Inner, Main, Header } from "../styles/containers";

import Nav from "../components/Nav";

const Home: NextPage = ({ children }) => {
  return (
    <div id="app">
      <Header>
        <Login />
        <Logo />
        <Nav />
      </Header>
      <Main>
        <Inner>{children}</Inner>
      </Main>
      <Footer>ppjk 2022</Footer>
    </div>
  );
};

export default Home;
