import React, { useEffect } from "react";
import projects from "../data/projects";
import ProjectDetails from "../components/projects/Details";
import { FlexBox } from "../styles/containers";
import ProjectButtons from "../components/projects/Buttons";
// import LaunchProject from "./launchproject";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state";
import { Project } from "../components/projects/types";
import { actions } from "../state/actiontypes";
import { useRouter } from "next/router";

const Projects = () => {
  const focus = useSelector((state: RootState) => state.main.focus);
  const project = useSelector((state: RootState) => state.main.project);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (focus !== "projects")
      dispatch({ type: actions.SET_FOCUS, focus: "projects" });
    if (project) router.push(`/projects/${project}`);
  });
  if (project) return null;
  return <ProjectButtons miniaturized={false} />;
};

export default Projects;
