import React, { useEffect, useRef, useState } from "react";
import { FlexBox, PageWrapper } from "../styles/containers";
import { getRandomNumber } from "../helpers";

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
    draw?: boolean;
    fire?: boolean;
    taunt?: boolean;
    size: number;
    top: number;
    left: number;
    alive?: boolean;
    travelTime?: number;
    health: number;
  };
  kill: (id: string) => void;
}) => {
  const color =
    props.health > 60
      ? "green"
      : props.health > 40
      ? "orange"
      : props.health > 0
      ? "red"
      : "transparent";
  return (
    <FlexBox
      column
      align="center"
      justify="center"
      id={id}
      onClick={() => kill(id)}
      style={{
        textAlign: "left",
        position: "absolute",
        left: props.left,
        top: props.top,
        borderRadius: 50,
        height: 10,
        width: "max-content",
        fontSize: props.size,
        transition: `${props.travelTime}s all ease-in`,
      }}
    >
      <FlexBox style={{ width: 40, border: "1px solid", borderColor: color }}>
        {Array.from(Array(props.health / 10).keys()).map((h) => (
          <span
            key={`${id}-health-${h}`}
            style={{
              width: "10%",
              backgroundColor: color,

              height: 10,
            }}
          ></span>
        ))}
      </FlexBox>
      {props.alive
        ? props.taunt
          ? "🤠"
          : props.fire
          ? "💥🤠"
          : props.draw
          ? "🔫 🤠"
          : "🤠"
        : "😵 "}
    </FlexBox>
  );
};

type Target = {
  id: string;
  top: number;
  left: number;
  size: number;
  taunt?: boolean;
  draw?: boolean;
  fire?: boolean;
  alive?: boolean;
  health: number;
  delay: number;
  travelTime?: number;
};

const MouseSlinger = () => {
  const ref = useRef<HTMLDivElement>(null);
  const blood = useRef<HTMLDivElement>(null);
  const [game, manageGame] = useState<{
    ticks: number;
    status: number;
    count: number;
    health: number;
    bodyCount: number;
    targets: Target[];
    hit?: boolean;
  }>({ status: 0, count: 0, bodyCount: 0, targets: [], health: 100, ticks: 1 });

  const killTarget = (id: string) => {
    let travelTime = 1;
    if (ref.current) {
      const elem = document.getElementById(`${id}`);
      if (!elem) {
        return;
      }
      const { offsetHeight } = ref.current;
      const target = game.targets.find((t) => t.id === id);
      if (!target) return;
      let health = target.health - getRandomNumber(1, 10) * 10;
      if (health < 0) {
        health = 0;
      }
      const top = offsetHeight - target.size / 2;
      const x = ((offsetHeight - (target.top + target.size)) * 2) / (9.8 * 200);
      travelTime = Math.sqrt(x);

      if (health < 1) {
        if (!elem) return;
        // kill target
        elem.style.animation = "0.5s jumpUp ease-out forwards";
      }
      manageGame({
        ...game,
        bodyCount: game.bodyCount + 1,
        targets: game.targets.map((t) =>
          t.id === id
            ? {
                ...t,
                alive: health < 1 ? false : true,
                travelTime,
                top: health < 1 ? top : t.top,
                health,
              }
            : t
        ),
      });
    }
  };

  useEffect(() => {
    const i = setInterval(() => {
      if (ref.current) {
        let { ticks, health } = game;
        if (health <= 0) {
          return manageGame({ ...game, status: 2 });
        }
        let count = game.count;
        let hit = false;
        let targets = [...game.targets];
        const makeTarget = (elem: HTMLDivElement) => {
          const size = getRandomNumber(20, 40);
          const top = getRandomNumber(0, elem.offsetHeight - size);
          const left = getRandomNumber(0, elem.offsetWidth - size);
          const id = String(count);
          targets.push({
            id,
            top,
            left,
            size,
            health: 100,
            alive: true,
            delay: getRandomNumber(0, 20),
          });
          count++;
        };
        // console.log(ref.current.offsetHeight);
        if (game.ticks % 20 === 0) {
          // spawn new enemies every second
          for (let i = 0; i < getRandomNumber(1, 3); i++) {
            makeTarget(ref.current);
          }
        }

        if (game.targets.filter((t) => !t.alive).length > 25) {
          // remove 5 corpses
          const dead = targets
            .filter((t) => !t.alive)
            .slice(0, 5)
            .map((d) => d.id);
          targets = targets.filter((t) => dead.indexOf(t.id) === -1);
        }
        if (blood.current) {
          blood.current.style.opacity = "0";
        }

        for (const target of targets) {
          if (!target.alive) continue;
          if (target.delay > 0) {
            //  target has just spawned and is passvie
            target.delay--;
            continue;
          }
          target.taunt = false;
          const fastDraw = Math.random() <= 0.5;
          if (!target.draw) {
            if (game.ticks % (fastDraw ? 5 : 10) === 0) {
              const draw = Math.random();
              if (draw >= 0.75) {
                target.draw = true;
              }
            }

            continue;
          } else {
            if (target.fire) {
              const shot = Math.random();
              if (shot > 0.5) {
                target.taunt = true;
                if (blood.current) {
                  blood.current.style.opacity = "0.5";
                  blood.current.style.transition = "0.5s all";
                  health = health - getRandomNumber(1, 5);
                }
              }
              // shoot here
              target.fire = false;
              target.draw = false;
              continue;
            }
            if (game.ticks % (fastDraw ? 5 : 10) === 0) {
              target.fire = true;
            }
          }
          // draw

          target.fire = true;
        }

        manageGame({ ...game, count, hit, targets, ticks: ticks + 1, health });
      }
    }, 100);
    return () => {
      clearInterval(i);
    };
  });
  return (
    <PageWrapper>
      <FlexBox
        id="mouse_slinger_main"
        style={{
          height: "100%",
          overflow: "hidden",
          transition: "all 0.1s",
        }}
        ref={ref}
      >
        <FlexBox column gapSize={5} style={{ padding: 5 }}>
          {game.status === 2 && <div>gameover</div>}
          <div>hp: {game.health}</div>
          <div>body count: {game.bodyCount}</div>
        </FlexBox>
        <div
          ref={blood}
          style={{
            transition: `5s all`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "red",
            zIndex: game.status === 2 ? 1 : 0,
            opacity: game.status === 2 ? 0.5 : 0,
          }}
        ></div>
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
    </PageWrapper>
  );
};
export default MouseSlinger;
