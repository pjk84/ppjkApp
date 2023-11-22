import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state";
import { actions } from "../state/actiontypes";
import { Control } from "../styles/buttons";
import { FlexBox, FlexBoxCentered } from "../styles/containers";
const Theme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.main.theme);

  const otherTheme = theme === "light" ? "dark" : "light";

  const setTheme = () => {
    localStorage.setItem("appTheme", otherTheme);
    dispatch({
      type: actions.SET_THEME,
      theme: otherTheme,
    });
  };

  return (
    <Control onClick={setTheme}>{`switch to ${otherTheme} theme`}</Control>
  );
};

export default Theme;
