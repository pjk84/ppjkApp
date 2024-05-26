import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../state";
import { FlexBox } from "../../styles/containers";
import Bitvavo from "./bitvavo";

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
    default:
  }
};

export default Projects;
