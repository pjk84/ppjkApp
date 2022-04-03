import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LaunchProject from "../../components/projects/Launchproject";
import { actions } from "../../state/actiontypes";
import ProjectButtons from "../../components/projects/Buttons";
import { Project } from "../../components/projects/types";
import ProjectDetails from "../../components/projects/Details";
import projects from "../../data/projects";
import { useRouter } from "next/router";
import { RootState } from "../../state";
import { FlexBox, FlexBoxCentered } from "../../styles/containers";

const Projects = () => {
  const project = useSelector((state: RootState) => state.main.project);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    // if (project !== id) dispatch({ type: actions.SELECT_PROJECT, id });
  });

  const projectDetails = projects.find((p: Project) => p.id === id) as Project;

  if (!projectDetails) return null;

  return (
    <FlexBox column gapSize="large">
      <ProjectButtons miniaturized={true} />
      <ProjectDetails
        key={`projectDetails-${id}`}
        animation={"jitter"}
        project={projectDetails}
      />
      <FlexBoxCentered style={{ width: "100%" }}>
        {projectDetails.demo && <LaunchProject projectId={projectDetails.id} />}
      </FlexBoxCentered>
    </FlexBox>
  );
};

export default Projects;
