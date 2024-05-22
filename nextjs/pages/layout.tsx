import type { NextPage } from "next";
import Logo from "../components/Header";
import { Footer, Main, Header, Ribbon, FlexBox } from "../styles/containers";
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
          <FlexBox
            style={{ padding: 20 }}
            align="center"
            justify="center"
            gapSize={25}
            wrap={"true"}
          >
            <Logo />
            <Nav />
          </FlexBox>
        </Header>
        <Main>{children}</Main>
        <Footer>{`pjk ${new Date().getFullYear()}`}</Footer>
      </div>
    </Backdrop>
  );
};

export default Home;
