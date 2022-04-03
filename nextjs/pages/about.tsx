import type { NextPage } from "next";
// import Section from "../components/Section";
import Table from "../components/Table";
import Header from "../components/Header";
import React, { useState, useEffect, ReactElement } from "react";
import { RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actiontypes";
import { FlexBox } from "../styles/containers";
import dynamic from "next/dynamic";
import { appTheme } from "../styles";

const AboutMe = () => {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.main.focus);
  useEffect(() => {
    if (focus !== "about")
      dispatch({ type: actions.SET_FOCUS, focus: "about" });
  });

  const About = dynamic(() => import("../components/About"), { ssr: false });

  

  return (
    <div>
      <About />
    </div>
  );
};

export default AboutMe;
