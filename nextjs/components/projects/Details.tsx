import React from "react";
import Table from "../../components/Table";
import { Project } from "./types";

interface Props {
  project: Project;
  animation: string;
}

const ProjectDetails = ({ project, animation }: Props) => {
  return <Table animation={animation} details={project} />;
};

export default ProjectDetails;
