import React, { useEffect } from "react";
import { FlexBox } from "../styles/containers";

const ApiPicker = () => {
  useEffect(() => {
    if (!localStorage.getItem("API")) {
      const v = process.env["NEXT_PUBLIC_API"] || "DOTNET";
      setApi(v);
    }
    // if (focus !== "settings")
    //   dispatch({ type: actions.SET_FOCUS, focus: "settings" });
  });

  const setApi = (api: string) => {
    localStorage.setItem("API", api);
  };

  const api = localStorage.getItem("API");

  const apiPicker = (
    <form key="config_api" style={{ display: "flex", gap: 10 }}>
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
  );

  return apiPicker;
};

export default ApiPicker;
