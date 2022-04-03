import type { NextPage } from "next";
// import Section from "../components/Section";
import Table from "../components/Table";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actiontypes";
import { FlexBox } from "../styles/containers";
import dynamic from "next/dynamic";
import { appTheme } from "../styles";

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
  return (
    <FlexBox gapSize="medium" column>
      <div
      // style={{ animation: `${Math.random()}s slideInRight`, fontSize: 25 }}
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
                color: `${appTheme.lightGray}`,
              }}
            >
              {d}:
            </div>
            <div style={{ animation: `${Math.random()}s slideInLeft` }}>
              {v}
            </div>
          </FlexBox>
        );
      })}
      <div
        style={{ animation: `${Math.random()}s slideInLeft`, fontSize: 25 }}
      >{`}`}</div>
    </FlexBox>
  );
};

export default About;
