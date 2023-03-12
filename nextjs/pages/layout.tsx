import type { NextPage } from "next";
import Logo from "../components/Header";
import { SBarToggle } from "../components/SideBar";
import { Footer, Inner, Main, Header } from "../styles/containers";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import { Backdrop } from "../styles/containers";

const Home: NextPage = ({ children }) => {
  return (
    <Backdrop>
      <div id="app">
        <SideBar />
        <Header>
          <SBarToggle />
          <Logo />
          <Nav />
        </Header>
        <Main>
          <Inner>{children}</Inner>
        </Main>
        <Footer>{`pjk ${new Date().getFullYear()}`}</Footer>
      </div>
    </Backdrop>
  );
};

export default Home;
