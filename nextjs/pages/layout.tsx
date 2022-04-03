import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import {
  FlexBox,
  FlexBoxCentered,
  Footer,
  Inner,
  Main,
  Top,
  Wrapper,
} from "../styles/containers";
import { StdButton } from "../components/Buttons";
import { appTheme } from "../styles";

const Home: NextPage = ({ children }) => {
  return (
    <Wrapper>
      <Top className="main-head">
        <Header />
        <FlexBox justify="center" wrap="true" gapSize="small">
          <StdButton page="about" title="about me" />
          <StdButton page="blog" title="blog" />
          <StdButton page="projects" title="projects" />
        </FlexBox>
      </Top>
      <Main className="main-body">
        <Inner>{children}</Inner>
      </Main>
      <Footer className="main-footer">ppjk 2022</Footer>
    </Wrapper>
  );
};

export default Home;
