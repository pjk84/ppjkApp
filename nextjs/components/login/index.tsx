import React, { useState } from "react";
import { Control } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { AuthResponse } from "../../api/client";
import Cookies from "universal-cookie";
import { actions } from "../../state/actiontypes";
import { RootState } from "../../state";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

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
    setIsActive(!active);
    setAttempts(attempts + 1);
  };

  const handleLoginError = () =>
    dispatch({
      error: "login failed",
    });

  const handleLogOut = () => {
    cookie.remove(ACCESS_TOKEN_KEY, { path: "/" });
    setIsActive(false);
    dispatch({
      type: actions.SET_LOGGED_IN,
      loggedIn: false,
      identity: null,
    });
  };

  const login = (
    <GoogleLogin
      onError={handleLoginError}
      onSuccess={(res) => handleLogin(res, IdentityProvider.GOOGLE)}
    />
  );

  const logOut = <Control onClick={handleLogOut}>log out</Control>;

  return isLoggedIn ? logOut : login;
};

export default Login;
