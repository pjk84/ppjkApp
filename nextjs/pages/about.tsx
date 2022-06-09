import type { NextPage } from "next";
// import Section from "../components/Section";
import Table from "../components/Table";
import Header from "../components/Header";
import React, { useRef, useEffect, useState } from "react";
import { RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actiontypes";
import { FlexBox } from "../styles/containers";
import dynamic from "next/dynamic";
import { appTheme } from "../styles";
import ppjk from "../public/ppjk.png";
import { chunk } from "lodash";

const AboutMe = () => {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.main.focus);
  const [chunks, setChunks] = useState<string[][]>([]);

  useEffect(() => {
    let chunkSize = 25;
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
        for (let i = 0; i < img.height; i += chunkSize) {
          let r = [];
          for (let n = 0; n < img.width; n += chunkSize) {
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
    if (focus !== "about") {
      dispatch({ type: actions.SET_FOCUS, focus: "about" });
    }
  });
  const ref = useRef<HTMLCanvasElement>(null);
  const About = dynamic(() => import("../components/About"), { ssr: false });
  return (
    <div>
      <canvas style={{ visibility: "hidden" }} ref={ref}></canvas>
      {chunks.length > 0 && (
        <>
          <FlexBox justify="center" style={{ marginBottom: 20 }}>
            <FlexBox key="chunks" column>
              {chunks?.map((r, ir) => (
                <FlexBox key={`chunks-row-${r}`}>
                  {r.map((c, ic) => {
                    return (
                      <img
                        key={`chunk-${ir}-${ic}`}
                        src={c}
                        style={{
                          opacity: 0,
                          animation: `${Math.random()}s ${Math.random()}s ${
                            ic % 2 === 0 ? "smoke1" : "smoke2"
                          } ease-in forwards`,
                        }}
                      />
                    );
                  })}
                </FlexBox>
              ))}
            </FlexBox>
          </FlexBox>
          <About />
        </>
      )}
    </div>
  );
};

export default AboutMe;
