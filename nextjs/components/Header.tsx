import React, { useState, useEffect } from "react";
import { Header2 } from "../styles/header";
import { FlexBox } from "../styles/containers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../state";

const Title = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tick, tock] = useState(0);
  const title = "<Pjk84_/>";
  useEffect(() => {
    setTimeout(
      () => {
        tock(tick + 1);
      },
      tick > 1 ? 60000 : title.length * 1000
    );
  });
  return (
    <FlexBox onClick={() => router.push("/")} key={tick.toString()}>
      {Array.from(title).map((l, i) => (
        <Header2
          key={`title-${i}`}
          style={{
            cursor: "pointer",
            visibility: l === "_" ? "hidden" : undefined,
            opacity: tick === 0 ? 0 : undefined,
            animation:
              1 === 1
                ? tick > 0
                  ? `0.1s ${1 + i / 10}s shoot ease-out`
                  : `${i / 6}s 0.5s typeIn ease-in forwards, 10s ${1 + i / 10}`
                : undefined,
          }}
        >
          {l}
        </Header2>
      ))}
    </FlexBox>
  );
};

export default Title;
