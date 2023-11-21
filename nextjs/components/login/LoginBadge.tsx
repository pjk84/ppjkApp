import React from "react";
import { RootState } from "../../state";
import { useSelector } from "react-redux";
import { Notification } from "../../styles/notifications";

const LoggedInIdentityBadge = () => {
  const loggedInIdentity = useSelector(
    (state: RootState) => state.main.auth.loggedInIdentity
  );
  return loggedInIdentity ? (
    <Notification>{`logged in as: ${loggedInIdentity}`}</Notification>
  ) : null;
};

export default LoggedInIdentityBadge;
