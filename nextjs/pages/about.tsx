// import Section from "../components/Section";

import React, { useRef, useEffect, useState } from "react";
import { RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actiontypes";
import { FlexBox, PageWrapper } from "../styles/containers";
import ppjk from "../public/ppjk.png";
import Languages from "../components/about/languages";
import Basics from "../components/about/basics";
import Tools from "../components/about/tools";

const AboutMe = () => {
  const name = "about";
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.main.focus);

  useEffect(() => {
    if (focus !== name) {
      dispatch({ type: actions.SET_FOCUS, focus: name });
      return;
    }
  });

  return (
    <PageWrapper>
      <FlexBox gapSize={40} column>
        <img
          style={{ width: "50%" }}
          src={
            "https://avatars.githubusercontent.com/u/47746832?s=400&u=b625177ac93d44dbf704fad5767ae4a8d4bc58f8&v=4"
          }
        />
        <Basics />
        <Languages />
        <Tools />
      </FlexBox>
    </PageWrapper>
  );
};

export default AboutMe;
