import React, { useState, useEffect, useRef } from "react";
import { FlexBox } from "../../styles/containers";
import { StdInput } from "../../styles/input";
import { StdButton } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api/client";
import { useTheme } from "styled-components";
import Cookies from "universal-cookie";
import { actions } from "../../state/actiontypes";
import { RootState } from "../../state";

const cookie = new Cookies();

const Login = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);
  const [active, setIsActive] = useState(false);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);

  type AppTheme = {
    green: string;
    blue: string;
  };

  const myRef = useRef(null);

  const theme = useTheme() as AppTheme;

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const token = await apiClient().login(input);
    if (token) {
      cookie.set("access_token", token);
      return dispatch({ type: actions.SET_LOGGED_IN, loggedIn: true });
    }
    setAttempts(attempts + 1);
  };

  const handleLogOut = () => {
    cookie.remove("access_token", { path: "/" });
    setIsActive(false);
    dispatch({ type: actions.SET_LOGGED_IN, loggedIn: false });
  };

  const toggle = () => {
    setAttempts(0);
    setIsActive(!active);
  };

  useEffect(() => {
    if (cookie.get("access_token")) {
      dispatch({ type: actions.SET_LOGGED_IN, loggedIn: true });
    }
    if (myRef.current) {
      document.getElementById("pwd")?.focus();
    }
  });

  const login = (
    <FlexBox
      justify="center"
      gapSize="small"
      style={{ position: "absolute", left: 10, top: 10 }}
    >
      <StdButton size="tiny" style={{ zIndex: 2 }} onClick={toggle}>
        login
      </StdButton>

      {active && (
        <form onSubmit={handleLogin}>
          <StdInput
            ref={myRef}
            id="pwd"
            key={`pjklogin-${attempts}`}
            placeholder="enter password"
            defaultValue={input}
            style={{
              animation:
                attempts > 0
                  ? "0.1s shake 10 ease-in"
                  : "0.2s slideDown ease-in, 1s fadeIn ease-out",
            }}
            type="password"
            onChange={(e) => setInput(e.target.value)}
          />
          {active && input && (
            <StdButton
              size="tiny"
              type="submit"
              onClick={handleLogin}
              style={{
                marginLeft: 10,
                animation:
                  "1s breathe ease-out infinite, 0.2s slideRight ease-out",
              }}
            >
              {">"}
            </StdButton>
          )}
        </form>
      )}
    </FlexBox>
  );

  const logOut = (
    <FlexBox
      align="center"
      gapSize="small"
      style={{ position: "absolute", left: 10, top: 10 }}
    >
      <StdButton size="tiny" onClick={handleLogOut}>
        logout
      </StdButton>
      <div style={{ color: theme.green }}>logged in</div>
    </FlexBox>
  );

  return loggedIn ? logOut : login;
};

export default Login;
