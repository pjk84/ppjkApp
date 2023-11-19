import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import LaunchProject from "../../components/projects/Launchproject";
import { actions } from "../../state/actiontypes";
import ProjectButtons from "../../components/projects/Buttons";
import { Project } from "../../components/projects/types";
import ProjectDetails from "../../components/projects/Details";
import projects from "../../data/projects";
import { useRouter } from "next/router";
import { RootState } from "../../state";
import { FlexBoxCentered } from "../../styles/containers";

const Projects = () => {
  const selectedProject = useSelector((state: RootState) => state.main.project);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedProject !== id) {
      batch(() => {
        dispatch({ type: actions.SELECT_PROJECT, id });
        dispatch({ type: actions.SET_FOCUS, focus: "projects" });
      });
    }
  });

  const projectDetails = projects.find((p: Project) => p.id === id) as Project;

  if (!projectDetails) return null;

  return (
    <FlexBoxCentered gap={50}>
      <ProjectButtons miniaturized={true} />
      <ProjectDetails key={`projectDetails-${id}`} project={projectDetails} />
      {projectDetails.demo && <LaunchProject projectId={projectDetails.id} />}
    </FlexBoxCentered>
  );
};

export default Projects;
