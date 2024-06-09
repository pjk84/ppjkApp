import React, { useState, useEffect } from "react";
import { ButtonBox, FlexBox, PageWrapper } from "../../styles/containers";
import projects from "../../data/projects";
import { StdButton } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { actions } from "../../state/actiontypes";
import { useRouter } from "next/router";
import { random } from "lodash";

interface Props {
  miniaturized?: boolean;
}

const ProjectMenu = ({ miniaturized }: Props) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const focus = useSelector((state: RootState) => state.main.project);
  const selectProject = (id: string) => {
    setClicked(true);
    setTimeout(
      () => {
        dispatch({ type: actions.SELECT_PROJECT, id });
        if (focus !== id) router.push(`/projects/${id}`);
      },
      miniaturized ? 0 : 500
    );
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    // e.preventDefault();
    if (e.key === "Enter") {
      if (!projects.find((p) => p.id === focus)?.demo) return;

      router.push(`
      /${focus}`);
      return;
    }
    let current = projects.findIndex((p) => p.id === focus);
    let next = 0;
    if (e.key === "ArrowLeft") {
      next = current - 1;
      if (current === 0) {
        next = projects.length - 1;
      }
      selectProject(projects[next].id);
    }
    if (e.key === "ArrowRight") {
      next = current + 1;
      if (current === projects.length - 1) {
        next = 0;
      }
      selectProject(projects[next].id);
    }
  };

  useEffect(() => {
    if (miniaturized) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return function cleanup() {
      // cleanup
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <PageWrapper center>
      <FlexBox justify="center" style={{ width: "100%" }}>
        <ButtonBox>
          {projects?.map((p, i) =>
            miniaturized ? (
              <StdButton
                size="small"
                active={focus === p.id}
                id={p.id}
                key={`projectBtn-${p.id}-miniature`}
                style={{
                  animation: "0.5s fadeIn",
                }}
                onClick={(e) =>
                  selectProject((e.target as HTMLButtonElement).id)
                }
              >
                {p.id.split("_").join(" ")}
              </StdButton>
            ) : (
              <StdButton
                size="large"
                shadow={true}
                active={focus === p.id}
                id={p.id}
                key={`projectBtn-${p.id}`}
                //   slideLeft={i % 2 === 0}
                style={{
                  opacity: clicked ? 1 : 0,
                  animation: clicked
                    ? i % 2 === 0
                      ? `0.5s slideOutRight ease-out forwards`
                      : `0.5s slideOutLeft ease-out forwards`
                    : `${0.3}s ${random(0.25, 0)}s PopIn ease-in forwards`,
                }}
                onClick={(e) =>
                  selectProject((e.target as HTMLButtonElement).id)
                }
              >
                {p.id.split("_").join(" ")}
              </StdButton>
            )
          )}
        </ButtonBox>
      </FlexBox>
    </PageWrapper>
  );
};

export default ProjectMenu;
