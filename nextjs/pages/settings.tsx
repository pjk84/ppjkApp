import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexBox } from "../styles/containers";
import { config } from "process";
import { actions } from "../state/actiontypes";
import { RootState } from "../state";

const Settings = () => {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.main.focus);

  useEffect(() => {
    if (!process.env.API) {
      process.env.API = process.env["NEXT_PUBLIC_API"] || "DOTNET";
    }
    if (focus !== "settings")
      dispatch({ type: actions.SET_FOCUS, focus: "settings" });
  });

  const Section = ({ title, elem }: { title: string; elem: ReactElement }) => {
    return (
      <FlexBox column>
        <h3>{title}</h3>
        {elem}
      </FlexBox>
    );
  };

  return (
    <FlexBox column>
      <Section
        title="api"
        elem={
          <form key="config_api">
            <label>
              <input
                key="config_api_dotnet"
                defaultChecked={process.env.API === "DOTNET"}
                onChange={() => (process.env.API = "DOTNET")}
                type="radio"
                name="api"
              />
              Dotnet
            </label>
            <label>
              <input
                key="config_api_flask"
                defaultChecked={process.env.API === "FLASK"}
                onChange={() => (process.env.API = "FLASK")}
                type="radio"
                name="api"
              />
              Flask
            </label>
          </form>
        }
      />
    </FlexBox>
  );
};

export default Settings;
