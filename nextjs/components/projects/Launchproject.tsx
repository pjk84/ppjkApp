import React, { useState, useEffect } from "react";
import { Btn1 } from "../../styles/buttons";
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
    setLaunching(true);
    setTimeout(() => {
      dispatch({ type: actions.SET_FOCUS, focus: projectId });
      router.push(`/${projectId}`);
    }, 500);
  };

  return (
    <Btn1
      key={`launch-project-${projectId}`}
      style={{ marginTop: 30 }}
      sweep={launching}
      slideUp={firstRender}
      color="blue"
      onClick={launchProject}
    >
      open project
    </Btn1>
  );
};

export default LaunchProject;
