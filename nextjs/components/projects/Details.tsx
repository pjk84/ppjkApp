import React from "react";
import Table from "../../components/Table";
import { Project } from "./types";
import { FlexBox } from "../../styles/containers";

interface Props {
  project: Project;
}

const ProjectDetails = ({ project }: Props) => {
  return (
    <FlexBox column gapSize={"large"} style={{ width: "100%" }}>
      <Table details={project} />
      {project.image && (
        <img src={project["image"]} style={{ maxWidth: "100%" }} />
      )}
    </FlexBox>
  );
};

export default ProjectDetails;
