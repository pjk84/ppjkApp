import React, { useEffect, useState } from "react";
import { FlexBox, SideBar, StdList } from "../styles/containers";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import { RootState } from "../state";
import { useDispatch } from "react-redux";
import { actions } from "../state/actiontypes";
import { Control, MenuDot, SidebarSwitch } from "../styles/buttons";
import dynamic from "next/dynamic";
import { size } from "../styles/devices";

const Login = dynamic(() => import("./login"));

export const ToggleSmallScreen = () => {
  const isSmallScreen = useSelector(
    (state: RootState) => state.main.isSmallScreen
  );
  const dispatch = useDispatch();
  return isSmallScreen ? (
    <FlexBox
      gapSize={2}
      onClick={() => dispatch({ type: actions.TOGGLE_SIDE_BAR })}
    >
      <MenuDot />
      <MenuDot />
      <MenuDot />
    </FlexBox>
  ) : null;
};

const SBar = () => {
  const smallSizeThreshold = 800;
  const isSmallScreen = useSelector(
    (state: RootState) => state.main.isSmallScreen
  );

  const active = useSelector((s: RootState) => s.main.showSideBar);
  const dispatch = useDispatch();

  const list = (
    <StdList>
      <Login />
      <Theme />
    </StdList>
  );

  const toggle = (
    <SidebarSwitch
      title="settings"
      key={"toggle-sidebar"}
      onClick={() => dispatch({ type: actions.TOGGLE_SIDE_BAR })}
    >
      {active ? "<" : ">"}
    </SidebarSwitch>
  );

  const sidebar = (
    <div style={{ position: "relative" }}>
      {isSmallScreen ? null : toggle}
      <SideBar id="sideBar" active={active}>
        {active ? list : null}
      </SideBar>
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: actions.IS_SMALL_SCREEN,
        isSmallScreen: window.innerWidth < smallSizeThreshold,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return sidebar;
};

export default SBar;
