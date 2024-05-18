import React, { useEffect } from "react";
import { ApiFramework } from "../api/client";

const ApiPicker = () => {
  useEffect(() => {
    if (!localStorage.getItem("API")) {
      setApi(ApiFramework.dotnet);
    }
  });

  const setApi = (api: ApiFramework) => {
    localStorage.setItem("API", api.toString());
  };

  const api = localStorage.getItem("API");

  const apiPicker = (
    <form key="config_api" style={{ display: "flex", gap: 10 }}>
      <label>
        <input
          key="config_api_dotnet"
          defaultChecked={api === ApiFramework.dotnet.toString()}
          onChange={() => setApi(ApiFramework.dotnet)}
          type="radio"
          name="api"
        />
        Dotnet
      </label>
      <label>
        <input
          key="config_api_flask"
          defaultChecked={api === ApiFramework.flask.toString()}
          onChange={() => setApi(ApiFramework.flask)}
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
