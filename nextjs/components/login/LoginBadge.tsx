import React, { useEffect } from "react";
import { RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../styles/notifications";
import Cookies from "universal-cookie";
import { actions } from "../../state/actiontypes";

const LoggedInIdentityBadge = () => {
  const ACCESS_TOKEN_KEY = "access_token";
  const ACCESS_IDENTITY_KEY = "logged_in_identity";

  const loggedInIdentity = useSelector(
    (state: RootState) => state.main.auth.loggedInIdentity
  );
  const dispatch = useDispatch();

  const cookie = new Cookies();

  useEffect(() => {
    if (!loggedInIdentity && cookie.get(ACCESS_TOKEN_KEY)) {
      dispatch({
        type: actions.SET_LOGGED_IN,
        loggedIn: true,
        error: null,
        identity: cookie.get(ACCESS_IDENTITY_KEY),
      });
    }
  });
  return loggedInIdentity ? (
    <Notification>{`logged in as ${loggedInIdentity}`}</Notification>
  ) : null;
};

export default LoggedInIdentityBadge;
