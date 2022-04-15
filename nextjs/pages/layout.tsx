import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../components/Header";
import {
  FlexBox,
  FlexBoxCentered,
  Footer,
  Inner,
  Main,
  Header,
  Wrapper,
} from "../styles/containers";
import { StdButton } from "../components/Buttons";

const Home: NextPage = ({ children }) => {
  return (
    <div id="app">
      <Header className="main-head">
        <Logo />
        <StdButton page="about" title="about" />
        <StdButton page="blog" title="blog" />
        <StdButton page="projects" title="projects" />
      </Header>
      <Main className="main-body">
        <Inner>{children}</Inner>
      </Main>
      <Footer className="main-footer">ppjk 2022</Footer>
    </div>
  );
};

export default Home;
