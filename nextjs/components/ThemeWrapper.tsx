import React, { ReactComponentElement, ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { actions } from "../state/actiontypes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../state";
import { appTheme, appThemeDark, appThemeLight } from "../styles";

const ThemeWrapper = ({ children }: { children: ReactElement }) => {
  const theme = useSelector((state: RootState) => state.main.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!theme) {
      const theme =
        typeof window !== "undefined" && localStorage.getItem("appTheme");
      dispatch({ type: actions.SET_THEME, theme });
    }
  });
  if (!theme) {
    return null;
  }
  return (
    <ThemeProvider theme={theme === "light" ? appThemeLight : appThemeDark}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
