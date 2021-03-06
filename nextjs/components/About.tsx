import React from "react";
import { RootState } from "../state";
import { useSelector } from "react-redux";
import { FlexBox } from "../styles/containers";
import { color, Themes } from "../styles";

const details = {
  Name: "Pieter Kemps",
  Birthday: "10-04-1984",
  Country: "The Netherlands",
  City: "Eindhoven",
  Email: "ppjk84@gmail.com",
  Scope: "full stack",
  languages: ["dutch", "english"],
  Programming_languages: [
    "Javascript",
    "Typescript",
    "Python",
    "C#",
    "C++",
    "Sql",
    "html",
    "css",
  ],
  Frameworks_and_tools: [
    "React",
    "Redux",
    "Flask",
    "Express",
    "Hapi",
    "SDL2",
    "nCurses",
    "Postgres",
  ],
};
const About = () => {
  const theme = useSelector((state: RootState) => state.main.theme);
  const gray = `${theme === Themes.light ? color.darkGray : color.lightGray}`;
  return (
    <FlexBox gapSize="medium" column>
      <div
        style={{
          animation: `${Math.random()}s slideInRight`,
          fontSize: 25,
          color: gray,
        }}
      >{`{`}</div>
      {Object.keys(details).map((d) => {
        let v = details[d as keyof typeof details];
        if (typeof v === "object") {
          v = `[${v.map((vv) => `"${vv}"`).join(", ")}]`;
        }
        return (
          <FlexBox key={`about_${d}`} gapSize="medium">
            <div
              style={{
                animation: `${Math.random()}s slideInRight`,
                paddingLeft: 50,
              }}
            >
              {d}:
            </div>
            <div
              style={{
                animation: `${Math.random()}s slideInLeft`,
                color: `${
                  theme === Themes.light ? color.lightGray : color.green
                }`,
              }}
            >
              {v}
            </div>
          </FlexBox>
        );
      })}
      <div
        style={{
          animation: `${Math.random()}s slideInLeft`,
          fontSize: 25,
          color: gray,
        }}
      >{`}`}</div>
    </FlexBox>
  );
};

export default About;
