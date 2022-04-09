import React from "react";
import { FlexBox } from "../../styles/containers";
import Table from "../../components/Table";
import { Header1 } from "../../styles/header";
import { Project } from "./types";

interface Props {
  project: Project;
  animation: string;
}

const ProjectDetails = ({ project, animation }: Props) => {
  return <Table animation={animation} details={project} />;
};

export default ProjectDetails;
