import React, { useState, useEffect } from "react";
import { ButtonBox } from "../../styles/containers";
import projects from "../../data/projects";
import { Btn1, StdButton } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { actions } from "../../state/actiontypes";
import { useRouter } from "next/router";
import { min } from "lodash";
import { route } from "next/dist/server/router";
import { HtmlProps } from "next/dist/shared/lib/utils";

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
    e.preventDefault();
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
    }
    if (e.key === "ArrowRight") {
      next = current + 1;
      if (current === projects.length - 1) {
        next = 0;
      }
    }
    selectProject(projects[next].id);
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
    <ButtonBox>
      {projects?.map((p, i) =>
        miniaturized ? (
          <StdButton
            size="small"
            active={focus === p.id}
            id={p.id}
            key={`projectBtn-${p.id}-miniature`}
            style={{
              animation: `${
                projects.length > 10 ? Math.random() / 2 : 0 + i / 5
              }s slideRight2 linear`,
            }}
            onClick={(e) => selectProject((e.target as HTMLButtonElement).id)}
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
              animation: clicked
                ? i % 2 === 0
                  ? `0.5s slideOutRight ease-out`
                  : `0.5s slideOutLeft ease-out`
                : isFirstRender
                ? `${0.2}s slideDownDiagonal${
                    i % 2 === 0 ? "Left" : "Right"
                  } ease-out`
                : undefined,
            }}
            onClick={(e) => selectProject((e.target as HTMLButtonElement).id)}
          >
            {p.id.split("_").join(" ")}
          </StdButton>
        )
      )}
    </ButtonBox>
  );
};

export default ProjectMenu;
