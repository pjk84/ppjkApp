import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import LaunchProject from "../../components/projects/Launchproject";
import { actions } from "../../state/actiontypes";
import ProjectButtons from "../../components/projects/Buttons";
import { Project } from "../../components/projects/types";
import projects from "../../data/projects";
import { useRouter } from "next/router";
import { RootState } from "../../state";
import { FlexBox, FlexBoxCentered } from "../../styles/containers";
import Bitvavo from "../../components/bitvavo/Bitvavo";

const Projects = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.main.auth.loggedIn
  );
  const router = useRouter();
  const { id } = router.query;

  if (!isLoggedIn)
    return (
      <FlexBox gapSize={25} column align="center" justify="center">
        not authorized
      </FlexBox>
    );

  switch (id) {
    case "bitvavo":
      return <Bitvavo />;
      break;
    default:
      return <div>oops</div>;
  }
};

export default Projects;
