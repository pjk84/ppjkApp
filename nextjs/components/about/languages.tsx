import React from "react";
import ChartBar from "./barChartHorizontal";

const languages = [
  { name: "cSharp", label: "c#", value: 1 },
  { name: "cPlusPlus", label: "c++", value: 0.5 },
  { name: "python", label: "Python", value: 2 },
  { name: "typescript", label: "Typescript", value: 5 },
  { name: "goLang", label: "go", value: 0.2 },
  { name: "javascript", label: "Javascript", value: 5 },
];

const Languages = () => <ChartBar title={"languages"} data={languages} />;

export default Languages;
