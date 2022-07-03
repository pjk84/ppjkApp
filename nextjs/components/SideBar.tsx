import React from "react";
import { SideBar } from "../styles/containers";
import Login from "./login";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import { RootState } from "../state";
import { useDispatch } from "react-redux";
import { actions } from "../state/actiontypes";
import { Control, SideBarToggle } from "../styles/buttons";
import dynamic from "next/dynamic";

const login = dynamic(() => import("./login"));

const SBar = () => {
  const show = useSelector((s: RootState) => s.main.showSideBar);

  const visible = {
    width: 100,
    paddingRight: 50,
  };

  const hidden = {
    width: "0px",
    padding: 0,
    border: "none",
  };
  return (
    <SideBar id="sideBar" style={show ? visible : hidden}>
      <div style={{ height: 25 }}></div>
      {login}
      <Theme />
    </SideBar>
  );
};

export const SBarToggle = () => {
  const show = useSelector((s: RootState) => s.main.showSideBar);
  const dispatch = useDispatch();
  const transform = show ? "rotate(180deg)" : "rotate(0deg)";
  return (
    <Control
      key={"toggle-sidebar"}
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        fontSize: 20,
        transform,
      }}
      onClick={() => dispatch({ type: actions.TOGGLE_SIDE_BAR })}
    >
      <SideBarToggle title="settings">{">>"}</SideBarToggle>
    </Control>
  );
};

export default SBar;
