import React, { useEffect, useRef, useState } from "react";
import { FlexBox } from "../styles/containers";
import { getRandomNumber } from "../helpers";
import { count } from "console";

const fieldStyle = {
  height: 100,
};

const Target = ({
  id,
  props,
  kill,
}: {
  id: string;
  props: {
    size: number;
    top: number;
    left: number;
    alive?: boolean;
    travelTime?: number;
  };
  kill: (id: string) => void;
}) => {
  return (
    <FlexBox
      align="center"
      justify="center"
      id={id}
      onClick={() => kill(id)}
      style={{
        position: "absolute",
        left: props.left,
        top: props.top,
        borderRadius: 50,
        height: 10,
        width: 10,
        fontSize: props.size,
        backgroundColor: "red",
        transition: `${props.travelTime}s all ease-in`,
        cursor: "pointer",
      }}
    >
      {props.alive ? "🤠" : "😵 "}
    </FlexBox>
  );
};

type Target = {
  id: string;
  top: number;
  left: number;
  size: number;
  alive?: boolean;
  travelTime?: number;
};

const MouseSlinger = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [game, manageGame] = useState<{
    status: number;
    count: number;
    targets: Target[];
  }>({ status: 0, count: 0, targets: [] });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const x = e.clientX - ref.current.offsetLeft;
      const y = e.clientY - ref.current.offsetTop;
    }
  };

  const killTarget = (id: string) => {
    let top = 0;
    let travelTime = 1;
    if (ref.current) {
      const { offsetHeight } = ref.current;
      const target = game.targets.find((t) => t.id === id);
      if (!target) return;
      top = offsetHeight - target.size / 2;
      const x = ((offsetHeight - (target.top + target.size)) * 2) / (9.8 * 200);
      travelTime = Math.sqrt(x);
      const elem = document.getElementById(`${id}`);
      console.log(elem);
      if (elem) {
        elem.style.animation = "0.5s jumpUp ease-out forwards";
      }
    }
    manageGame({
      ...game,
      targets: [
        ...game.targets.slice(0, +id),
        ...[{ ...game.targets[+id], alive: false, top, travelTime }],
        ...game.targets.slice(+id + 1),
      ],
    });
  };

  useEffect(() => {
    if (game.targets.filter((t) => t.alive).length > 10) {
      // 2 = game over
      manageGame({ ...game, status: 2 });
      return;
    }

    const i = setInterval(() => {
      if (ref.current) {
        let count = game.count;
        let newTargets: Target[] = [];
        const makeTarget = (elem: HTMLDivElement) => {
          console.log("make");
          const size = getRandomNumber(20, 40);
          const top = getRandomNumber(0, elem.offsetHeight - size);
          const left = getRandomNumber(0, elem.offsetWidth - size);
          const id = String(count);
          newTargets.push({ id, top, left, size, alive: true });
          count++;
        };
        // console.log(ref.current.offsetHeight);
        for (let i = 0; i < getRandomNumber(1, 5); i++) {
          makeTarget(ref.current);
        }
        let targets = [...game.targets, ...newTargets];
        if (game.targets.length > 20) {
          // clean up corpses
          targets = targets.filter((t) => t.alive);
        }
        manageGame({ ...game, count, targets });
      }
    }, 5000);
    return () => {
      clearInterval(i);
    };
  });

  console.log(game.targets);

  return (
    <FlexBox
      style={{ height: "100%", overflow: "hidden" }}
      ref={ref}
      onMouseDown={handleClick}
    >
      {game.status === 2 && <div>gameover</div>}
      {game.targets.map((t) => {
        return (
          <Target
            props={t}
            id={String(t.id)}
            kill={killTarget}
            key={`target-${t.id}`}
          />
        );
      })}
    </FlexBox>
  );
};
export default MouseSlinger;
