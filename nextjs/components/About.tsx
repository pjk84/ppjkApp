import React from "react";
import { RootState } from "../state";
import { useSelector } from "react-redux";
import { FlexBox } from "../styles/containers";
import { HyperLink } from "../styles/buttons";
import { color, Themes } from "../styles";

const details = {
  Name: "Pieter Kemps",
  Birthday: "10-04-1984",
  Country: "The Netherlands",
  City: "Eindhoven",
  Email: "ppjk84@gmail.com",
  Github: "https://github.com/pjk84",
  Scope: "full stack",
  Languages: ["dutch", "english"],
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
        let e;

        if (typeof v === "object") {
          e = `[${v.map((vv) => `"${vv}"`).join(", ")}]`;
        } else {
          if (v.includes("https")) {
            e = <HyperLink href={`${v}`}>{`"${v}",`}</HyperLink>;
          } else {
            e = `"${v}",`;
          }
        }
        return (
          <FlexBox key={`about_${d}`} gapSize="medium">
            <div
              key={`about_left_${d}`}
              style={{
                animation: `${Math.random()}s slideInRight`,
                paddingLeft: 50,
                opacity: 0.8,
              }}
            >
              {`"${d}"`}:
            </div>
            <div
              key={`about_right_${d}`}
              style={{
                animation: `${Math.random()}s slideInLeft`,
              }}
            >
              {e}
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
