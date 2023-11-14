import React from "react";
import Table from "../../components/Table";
import { Project } from "./types";
import { FlexBox } from "../../styles/containers";

interface Props {
  project: Project;
  animation: string;
}

const ProjectDetails = ({ project, animation }: Props) => {
  return (
    <FlexBox column gapSize={"large"} style={{ width: "100%" }}>
      <Table animation={animation} details={project} />
      <img src={project["image"]} />
    </FlexBox>
  );
};

export default ProjectDetails;
