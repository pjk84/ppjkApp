import React, { useEffect, useRef, useState } from "react";
import { FlexBox } from "../../../styles/containers";
import { Header1 } from "../../../styles/header";
import { ChartBar, ChartLine } from "../../../styles/barGraph";

interface DayValue {
  day: number;
  value: number;
}

interface Snapshot {
  market: string;
  days: DayValue[];
}

const CHART_HEIGHT = 250;
const INVERTVAL_Y = 10000;

const BitvavoPortfolioChart = ({ days, market }: Snapshot) => {
  var barHeight = 25;
  var gapSize = 10;
  //container height should be roughtly equal to combined barheight
  // this way intersection threshold is close to chart height
  const minHeight = days.length * (barHeight + gapSize) + barHeight;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const max = Math.max(...days.map((d) => d.value));
  const maxY = Math.round(max / INVERTVAL_Y) * INVERTVAL_Y + INVERTVAL_Y;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries[0]?.isIntersecting && setIsVisible(true);
      },
      { threshold: 1 }
    );

    ref.current && !isVisible && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const Wrapper = (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        borderBottom: "1px solid",
        borderColor: "gray",
        height: CHART_HEIGHT,
      }}
    >
      {[...Array(maxY / INVERTVAL_Y)].map((y, i) => (
        <ChartLine
          label={maxY - i * INVERTVAL_Y}
          height={CHART_HEIGHT}
          position={i * (CHART_HEIGHT / (maxY / INVERTVAL_Y))}
        ></ChartLine>
      ))}
    </div>
  );
  const main = (
    <FlexBox column>
      <FlexBox
        gapSize={2}
        style={{
          justifyContent: "space-around",
          height: CHART_HEIGHT,
        }}
      >
        {[...Array(32)].map((_, i) => {
          const d = days.find((d) => d.day == i);
          return (
            <FlexBox style={{ width: 20 }} column justify="end">
              {d && (
                <ChartBar
                  text={`${d.value}`}
                  height={(d.value / max) * (CHART_HEIGHT * (max / maxY))}
                ></ChartBar>
              )}
            </FlexBox>
          );
        })}
      </FlexBox>
      {Wrapper}
    </FlexBox>
  );

  return (
    <FlexBox gapSize={10} column style={{ width: "100%" }}>
      {main}
      <FlexBox
        style={{
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {[...Array(32)].map((_, i) => {
          return (
            <FlexBox
              justify="center"
              style={{ width: 20, visibility: i == 0 ? "hidden" : "visible" }}
            >
              {i}
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
};

export default BitvavoPortfolioChart;
