import React from "react";
import BarChartHorizontal from "./barChartHorizontal";

const tools = [
  { name: "react", label: "React", value: 3.5 },
  { name: "dotnet", label: ".net", value: 1 },
  { name: "redux", label: "Redux", value: 3 },
  { name: "postgres", label: "Postgres", value: 4 },
  { name: "node", label: "NodeJS", value: 2 },
  { name: "flask", label: "Flask", value: 2 },
];

const ToolsAndFrameworks = () => (
  <BarChartHorizontal title={"tools"} data={tools} />
);

export default ToolsAndFrameworks;
