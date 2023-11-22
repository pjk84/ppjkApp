import type { NextPage } from "next";
import Logo from "../components/Header";
import { Footer, Inner, Main, Header, Ribbon } from "../styles/containers";
import Nav from "../components/Nav";
import SideBar, { ToggleSmallScreen } from "../components/SideBar";
import { Backdrop } from "../styles/containers";
import LoggedInIdentityBadge from "../components/login/LoginBadge";

const Home: NextPage = ({ children }) => {
  return (
    <Backdrop>
      <div id="app">
        <SideBar />
        <Header>
          <Ribbon>
            <ToggleSmallScreen />
            <LoggedInIdentityBadge />
          </Ribbon>
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
