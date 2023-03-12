import React from "react";
import { RootState } from "../state";
import { useSelector } from "react-redux";
import { Bar, FlexBox } from "../styles/containers";
import { HyperLink } from "../styles/buttons";
import { color, Themes } from "../styles";

const languages = [
  { language: "cSharp", label: "c#", experience: 1 },
  { language: "cPlusPlus", label: "c++", experience: 0.5 },
  { language: "python", label: "Python", experience: 4 },
  { language: "typescript", label: "Typescript", experience: 3 },
  { language: "goLang", label: "go", experience: 0.2 },
  { language: "javascript", label: "Javascript", experience: 5 },
];

const maxExp = Math.max(...languages.map((l) => l.experience));

console.log(maxExp);

const details = {
  Name: "Pieter Kemps",
  Birthday: "10-04-1984",
  Country: "The Netherlands",
  City: "Eindhoven",
  Email: "ppjk84@gmail.com",
  Github: "https://github.com/pjk84",
  Scope: "full stack",
  Languages: ["dutch", "english"],

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
    <FlexBox gapSize={50} column>
      <FlexBox gapSize="small" column>
        {Object.keys(details).map((d) => {
          let v = details[d as keyof typeof details];

          if (typeof v === "object") {
            v = v.join(", ");
          }

          return (
            <FlexBox key={`about_${d}`} gapSize="medium">
              <div
                key={`about_left_${d}`}
                style={{
                  animation: `${Math.random()}s slideInRight`,
                  opacity: 0.8,
                }}
              >
                {`${d}`}:
              </div>
              <div
                key={`about_right_${d}`}
                style={{
                  animation: `${Math.random()}s slideInLeft`,
                }}
              >
                {v.includes("http") ? (
                  <HyperLink href={`${v}`}>{`"${v}",`}</HyperLink>
                ) : (
                  v
                )}
              </div>
            </FlexBox>
          );
        })}
      </FlexBox>

      <FlexBox gapSize="medium" column>
        <FlexBox column gapSize={10} style={{ overflow: "hidden" }}>
          {languages.map((l) => {
            return (
              <FlexBox key={`stat-${l.label}`}>
                <Bar
                  key={`bar-${l.label}`}
                  style={{
                    animation: "0.5s grow ease-out",

                    height: 30,
                    width: `${(l.experience / maxExp) * 100}%`,
                  }}
                ></Bar>
                <div
                  key={`label-${l.label}`}
                  style={{
                    // textAlign: "center",
                    left: 5,
                    top: 5,
                    color: "black",
                    // height: 10,
                    position: "absolute",
                  }}
                >
                  {l.label}
                </div>
              </FlexBox>
            );
          })}
        </FlexBox>
        <FlexBox>
          <div style={{ opacity: 0.5, position: "absolute", left: 0 }}>
            years
          </div>
          {Array.from(Array(maxExp).keys()).map((e) => {
            return (
              <div
                key={`y-legend-${e}`}
                style={{
                  textAlign: "right",
                  width: `${(1 / maxExp) * 100}% `,
                  height: 10,
                }}
              >
                {e + 1}
              </div>
            );
          })}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default About;
