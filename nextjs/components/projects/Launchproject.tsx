import React, { useState, useEffect } from "react";
import { Btn1, StdButton } from "../../styles/buttons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actiontypes";
interface Props {
  projectId: string;
}

const LaunchProject = ({ projectId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [firstRender, isFirstRender] = useState(true);
  const [launching, setLaunching] = useState(false);
  const launchProject = () => {
    console.log(projectId);
    setLaunching(true);
    setTimeout(() => {
      dispatch({ type: actions.SET_FOCUS, focus: projectId });
      router.push(`/${projectId}`);
    }, 500);
  };

  return (
    <StdButton
      animation={launching ? "sweep" : firstRender ? "slideUp" : ""}
      size={"medium"}
      key={`launch-project-${projectId}`}
      // sweep={launching}
      // slideUp={firstRender}
      color="blue"
      onClick={launchProject}
    >
      open project
      <div style={{ fontSize: 10, opacity: "0.5" }}>(press enter)</div>
    </StdButton>
  );
};

export default LaunchProject;
