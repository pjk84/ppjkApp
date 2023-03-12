// import Section from "../components/Section";

import React, { useRef, useEffect, useState } from "react";
import { RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actiontypes";
import { FlexBox } from "../styles/containers";
import ppjk from "../public/ppjk.png";
import Languages from "../components/about/languages";
import Basics from "../components/about/basics";
import Tools from "../components/about/tools";

const AboutMe = () => {
  const name = "about";
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.main.focus);
  const [chunks, setChunks] = useState<string[][]>([]);
  let chunkSize = 25;

  useEffect(() => {
    if (focus !== name) {
      dispatch({ type: actions.SET_FOCUS, focus: name });
      return;
    }
    if (ref.current && chunks?.length === 0) {
      const draw = () => {
        const getSection = (offsetX: number, offsetY: number) => {
          ctx?.drawImage(
            img,
            offsetX,
            offsetY,
            chunkSize,
            chunkSize,
            0,
            0,
            chunkSize,
            chunkSize
          );
          return c.toDataURL("image/jpeg");
        };
        let rows: string[][] = [];

        // make height and width exact multiple of chunk size
        const height = img.height - (img.height % chunkSize);
        const width = img.width - (img.width % chunkSize);

        for (let i = 0; i < height; i += chunkSize) {
          let r = [];
          for (let n = 0; n < width; n += chunkSize) {
            r.push(getSection(n, i));
          }
          rows.push(r);
        }
        setChunks(rows);
      };
      const c = ref.current;
      var ctx = c.getContext("2d");
      if (!ctx) return;
      var img = new Image();
      img.src = ppjk.src;
      c.height = chunkSize;
      c.width = chunkSize;
      img.onload = draw;
    }
  });
  const ref = useRef<HTMLCanvasElement>(null);
  // const About = dynamic(() => import("../components/About"), { ssr: false });

  return (
    <div>
      <canvas
        key="about_canvas"
        style={{ visibility: "hidden" }}
        ref={ref}
      ></canvas>
      {chunks.length > 0 && (
        <FlexBox gapSize={40} column>
          <FlexBox>
            <FlexBox key="chunks" column>
              {chunks?.map((r, ir) => (
                <FlexBox key={`chunks-row-${r}`}>
                  {r.map((c, ic) => {
                    const r = Math.random();
                    return (
                      <picture
                        key={`chunk-${ir}-${ic}`}
                        style={{
                          position: "relative",
                          width: chunkSize,
                          height: chunkSize,
                        }}
                      >
                        <img
                          alt=""
                          src={c}
                          style={{
                            opacity: r > 0.5 ? 0.95 : 1,
                            animation: `${r}s jitterIn ease-out`,
                          }}
                        />
                      </picture>
                    );
                  })}
                </FlexBox>
              ))}
            </FlexBox>
          </FlexBox>
          <Basics />
          <Languages />
          <Tools />
        </FlexBox>
      )}
    </div>
  );
};

export default AboutMe;
