import React, { useEffect, useRef, useState } from "react";
import { FlexBox } from "../../../styles/containers";
import { Header1 } from "../../../styles/header";
import { ChartBar, ChartLine } from "../../../styles/barGraph";

interface DayValue {
  day: number;
  value: number;
}

interface Snapshot {
  daysInMonth: number;
  days: DayValue[];
}

const CHART_HEIGHT = 250;

const BitvavoPortfolioChart = ({ days, daysInMonth }: Snapshot) => {
  var barHeight = 25;
  var gapSize = 10;
  //container height should be roughtly equal to combined barheight
  // this way intersection threshold is close to chart height
  const minHeight = days.length * (barHeight + gapSize) + barHeight;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const max = Math.max(...days.map((d) => d.value));

  const getInterval = (max: number) => {
    var n = 1;
    while (true) {
      if (max < 10 ** n) {
        return 10 ** (n - 1);
      }
      n++;
    }
  };
  var intervalY = getInterval(max);

  const maxY = Math.round(max / intervalY) * intervalY + intervalY;

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
      {[...Array(maxY / intervalY)].map((y, i) => (
        <ChartLine
          label={maxY - i * intervalY}
          height={CHART_HEIGHT}
          position={i * (CHART_HEIGHT / (maxY / intervalY))}
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
        {[...Array(daysInMonth + 1)].map((_, i) => {
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
        {[...Array(daysInMonth + 1)].map((_, i) => {
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
