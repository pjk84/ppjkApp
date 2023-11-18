import React from "react";
import { SideBar, StdList } from "../styles/containers";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import { RootState } from "../state";
import { useDispatch } from "react-redux";
import { actions } from "../state/actiontypes";
import { Control } from "../styles/buttons";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./login"));

const SBar = () => {
  const active = useSelector((s: RootState) => s.main.showSideBar);

  return (
    <SideBar id="sideBar" active={active}>
      <StdList>
        <Login />
        <Theme />
      </StdList>
    </SideBar>
  );
};

export const SBarToggle = () => {
  const dispatch = useDispatch();
  return (
    <Control
      title="settings"
      key={"toggle-sidebar"}
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        fontSize: 20,
      }}
      onClick={() => dispatch({ type: actions.TOGGLE_SIDE_BAR })}
    >
      ☰
    </Control>
  );
};

export default SBar;
