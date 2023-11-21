import React from "react";
import { SideBar, StdList } from "../styles/containers";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import { RootState } from "../state";
import { useDispatch } from "react-redux";
import { actions } from "../state/actiontypes";
import { Control, SidebarSwitch } from "../styles/buttons";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./login"));

const SBar = () => {
  const active = useSelector((s: RootState) => s.main.showSideBar);
  const dispatch = useDispatch();

  const Toggle = (
    <SidebarSwitch
      title="settings"
      key={"toggle-sidebar"}
      onClick={() => dispatch({ type: actions.TOGGLE_SIDE_BAR })}
    >
      {active ? "<" : ">"}
    </SidebarSwitch>
  );

  const list = (
    <StdList>
      <Login />
      <Theme />
    </StdList>
  );

  return (
    <div style={{ position: "relative" }}>
      {Toggle}
      <SideBar id="sideBar" active={active}>
        {active ? list : null}
      </SideBar>
    </div>
  );
};

export default SBar;
