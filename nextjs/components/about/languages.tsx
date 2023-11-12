import React from "react";
import { RootState } from "../../state";
import { useSelector } from "react-redux";
import { Bar, FlexBox } from "../../styles/containers";
import { color, Themes } from "../../styles";

const languages = [
  { language: "cSharp", label: "c#", experience: 1 },
  { language: "cPlusPlus", label: "c++", experience: 0.5 },
  { language: "python", label: "Python", experience: 3 },
  { language: "typescript", label: "Typescript", experience: 3 },
  { language: "goLang", label: "go", experience: 0.2 },
  { language: "javascript", label: "Javascript", experience: 5 },
];

const maxExp = Math.max(...languages.map((l) => l.experience));

const Languages = () => {
  return (
    <FlexBox gapSize="medium" column>
      languages:
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
        <div style={{ opacity: 0.5, position: "absolute", left: 0 }}>years</div>
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
  );
};

export default Languages;