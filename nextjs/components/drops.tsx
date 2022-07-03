import type { NextPage } from "next";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Drop } from "../styles/containers";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../state/actiontypes";
import { RootState } from "../state";
import { appTheme } from "../styles";
// if (focus !== "main") dispatch({ type: actions.SET_FOCUS, focus: "main" });

const Drops: NextPage = () => {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.main.focus);
  const LEN = 200;
  const myRef = useRef(null);
  const [elem, addElem] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (focus !== "main") {
      dispatch({ type: actions.SET_FOCUS, focus: "main" });
      addElem([]);
      return;
    }
    const e = document.getElementById("rain");
    if (e) {
      // if (winHeight !== e?.offsetHeight) {
      //   setWinHeight(e?.offsetHeight);
      // }
      setTimeout(
        () => {
          if (!myRef.current) return;
          addElem([
            ...(elem.length === 4 * LEN ? elem.slice(LEN, elem.length) : elem),
            ...Array(LEN)
              .fill(0)
              .map((p, i) => {
                const r = Math.random();
                return (
                  <Char
                    color={appTheme.green}
                    key={`${Math.random()}_${i}`}
                    name={r > 0.5 ? "1" : "0"}
                    size={Math.floor(Math.random() * 25)}
                    pos={Math.floor(Math.random() * e.offsetWidth)}
                    delay={i / 10}
                  />
                );
              }),
          ]);
        },
        elem.length === 0 ? 0 : 10000
      );
    }
  }, [addElem, elem, dispatch, focus]);
  return (
    // <div>boingg</div>
    <div
      ref={myRef}
      id="rain"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {elem && elem.map((e) => e)}
    </div>
  );
};

type Item = {
  color: string;
  name: string;
  pos: number;
  size: number;
  delay: number;
};

const Char = ({ name, pos, delay, size }: Item) => {
  return (
    <Drop
      style={{
        fontSize: size,
        left: pos,
        animation: `${Math.floor(
          Math.random() * 10
        )}s ${delay}s rain forwards linear`,
      }}
    >
      {name}
    </Drop>
  );
};

export default Drops;
