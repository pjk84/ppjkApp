import React, { useState, useEffect } from "react";
import { Btn1, ProjectLaunchButton, StdButton } from "../../styles/buttons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actiontypes";
interface Props {
  projectId: string;
}

const LaunchProject = ({ projectId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [launching, setLaunching] = useState(false);
  const launchProject = () => {
    setLaunching(true);
    setTimeout(() => {
      dispatch({ type: actions.SET_FOCUS, focus: projectId });
      router.push(`/${projectId}`);
    }, 500);
  };

  return (
    <ProjectLaunchButton
      wasClicked={launching}
      key={`launch-project-${projectId}`}
      onClick={launchProject}
    >
      open project
    </ProjectLaunchButton>
  );
};

export default LaunchProject;
