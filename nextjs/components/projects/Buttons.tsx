import React, { useState, useEffect } from "react";
import { ButtonBox } from "../../styles/containers";
import projects from "../../data/projects";
import { Btn1, ButtonBasic } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { actions } from "../../state/actiontypes";
import { useRouter } from "next/router";

interface Props {
  miniaturized?: boolean;
}

const ProjectMenu = ({ miniaturized }: Props) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const focus = useSelector((state: RootState) => state.main.project);
  const selectProject = (e: any) => {
    const id = e.target.id;
    setClicked(true);
    setTimeout(
      () => {
        dispatch({ type: actions.SELECT_PROJECT, id });
        if (focus !== id) router.push(`/projects/${id}`);
      },
      miniaturized ? 0 : 500
    );
  };
  console.log(focus);

  return (
    <ButtonBox>
      {projects?.map((p, i) =>
        miniaturized ? (
          <ButtonBasic
            size={"small"}
            active={focus === p.id}
            id={p.id}
            key={`projectBtn-${p.id}-miniature`}
            style={{
              animation: `${0 + i / 5}s slideDown ease-out`,
            }}
            onClick={selectProject}
          >
            {p.id.split("_").join(" ")}
          </ButtonBasic>
        ) : (
          <ButtonBasic
            size={"large"}
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
            onClick={selectProject}
          >
            {p.id.split("_").join(" ")}
          </ButtonBasic>
        )
      )}
    </ButtonBox>
  );
};

export default ProjectMenu;
