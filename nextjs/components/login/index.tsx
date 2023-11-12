import React, { useState, useEffect } from "react";
import { FlexBox } from "../../styles/containers";
import { Control } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { AuthResponse } from "../../api/client";
import Cookies from "universal-cookie";
import { actions } from "../../state/actiontypes";
import { RootState } from "../../state";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Warning } from "../../styles/notifications";

const cookie = new Cookies();

const ACCESS_TOKEN_KEY = "access_token";
const ACCESS_IDENTITY_KEY = "logged_in_identity";

enum IdentityProvider {
  GOOGLE,
  FACEBOOK,
}

type GoogleLoginPayload = {
  clientId: string;
  token: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.main.auth.loggedIn
  );
  const loggedInIdentity = useSelector(
    (state: RootState) => state.main.auth.loggedInIdentity
  );
  const loggedInError = useSelector(
    (state: RootState) => state.main.auth.error
  );
  const [active, setIsActive] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = async (
    res: CredentialResponse,
    provider: IdentityProvider
  ) => {
    let creds: AuthResponse | undefined;
    if (provider == IdentityProvider.GOOGLE) {
      const payload = { clientId: res.clientId!, token: res.credential! };
      const path = "auth/login-with-google";
      creds = await apiClient().post<AuthResponse, GoogleLoginPayload>(
        path,
        payload
      );
    }
    if (creds) {
      cookie.set(ACCESS_TOKEN_KEY, creds.token);
      cookie.set(ACCESS_IDENTITY_KEY, creds.identity);
      dispatch({
        type: actions.SET_LOGGED_IN,
        loggedIn: true,
        identity: creds.identity,
        error: null,
      });
    } else {
      dispatch({
        type: actions.SET_LOGGED_IN,
        error: "not authorized",
      });
    }
    setAttempts(attempts + 1);
  };

  const handleLogOut = () => {
    cookie.remove(ACCESS_TOKEN_KEY, { path: "/" });
    setIsActive(false);
    dispatch({
      type: actions.SET_LOGGED_IN,
      loggedIn: false,
      identity: null,
    });
  };

  const toggle = () => {
    setAttempts(0);
    setIsActive(!active);
    if (loggedInError) {
      dispatch({
        type: actions.SET_LOGGED_IN,
        error: null,
      });
    }
  };

  useEffect(() => {
    if (!isLoggedIn && cookie.get(ACCESS_TOKEN_KEY)) {
      dispatch({
        type: actions.SET_LOGGED_IN,
        loggedIn: true,
        error: null,
        identity: cookie.get(ACCESS_IDENTITY_KEY),
      });
    }
  });

  const login = (
    <FlexBox column gapSize={2}>
      <Control style={{ zIndex: 2 }} onClick={toggle}>
        login
      </Control>

      {active && (
        <FlexBox column gapSize={"small"}>
          {loggedInError ? <Warning>{loggedInError}</Warning> : null}
          <GoogleLogin
            onSuccess={(res) => handleLogin(res, IdentityProvider.GOOGLE)}
          />
        </FlexBox>
      )}
    </FlexBox>
  );

  const logOut = (
    <FlexBox gapSize="small" align="center">
      <Control onClick={handleLogOut}> {`log out ${loggedInIdentity}`}</Control>
      <div
        style={{
          borderRadius: 50,
          width: 10,
          height: 10,
        }}
      ></div>
    </FlexBox>
  );

  return isLoggedIn ? logOut : login;
};

export default Login;
