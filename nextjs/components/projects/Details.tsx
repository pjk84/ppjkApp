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
  return (
    <>
      <FlexBox style={{ padding: 25, width: "max-content" }}>
        {Array.from(project.id).map((l: string, i: any) => (
          <Header1
            key={`project-details-header${i}`}
            style={{
              animation: `${i / 20}s  slideOverRight ease-in`,
              opacity: l === "_" ? 0 : 1,
            }}
          >
            {l}
          </Header1>
        ))}
      </FlexBox>
      <Table animation={animation} details={project} />
    </>
  );
};

export default ProjectDetails;
