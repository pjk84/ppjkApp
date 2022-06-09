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
    if (!localStorage.getItem("API")) {
      const v = process.env["NEXT_PUBLIC_API"] || "DOTNET";
      setApi(v);
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

  const setApi = (api: string) => {
    localStorage.setItem("API", api);
  };

  const api = localStorage.getItem("API");

  return (
    <FlexBox column>
      <Section
        title="api"
        elem={
          <form key="config_api">
            <label>
              <input
                key="config_api_dotnet"
                defaultChecked={api === "DOTNET"}
                onChange={() => setApi("DOTNET")}
                type="radio"
                name="api"
              />
              Dotnet
            </label>
            <label>
              <input
                key="config_api_flask"
                defaultChecked={api === "FLASK"}
                onChange={() => setApi("FLASK")}
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
