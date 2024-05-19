import React, { useEffect, useState } from "react";
import { FlexBox, SideBar, StdList } from "../styles/containers";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import { RootState } from "../state";
import { useDispatch } from "react-redux";
import { actions } from "../state/actiontypes";
import { Control, MenuDot, SidebarSwitch } from "../styles/buttons";
import dynamic from "next/dynamic";
import ApiPicker from "./ApiControls";
import { useRouter } from "next/router";

const Login = dynamic(() => import("./login"));
const smallSizeThreshold = 800;

export const ToggleSmallScreen = () => {
  const dispatch = useDispatch();

  return (
    <FlexBox
      style={{ cursor: "pointer" }}
      gapSize={2}
      onClick={() => dispatch({ type: actions.TOGGLE_SIDE_BAR })}
    >
      <MenuDot />
      <MenuDot />
      <MenuDot />
    </FlexBox>
  );
};

const SBar = () => {
  const router = useRouter();
  const active = useSelector((s: RootState) => s.main.showSideBar);

  const list = (
    <StdList>
      <Login />
      <Control onClick={() => router.push("/private/bitvavo")}>bitvavo</Control>
      <Theme />
      <ApiPicker />
    </StdList>
  );

  const sidebar = (
    <div style={{ position: "relative" }}>
      <SideBar id="sideBar" active={active}>
        {active ? list : null}
      </SideBar>
    </div>
  );

  return sidebar;
};

export default SBar;
