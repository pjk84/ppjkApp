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
const LABEL_SIZE = 15;
const MIN_WIDTH_X = 20;

const BitvavoPortfolioChart = ({ days, daysInMonth }: Snapshot) => {
  const [viewedDay, setViewedDay] = useState<number | null>(null);
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

  const linesY = (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        borderColor: "gray",
        height: CHART_HEIGHT,
      }}
    >
      {[...Array(maxY / intervalY)].map((y, i) => (
        <ChartLine
          key={`axis-y-${i}`}
          height={CHART_HEIGHT}
          position={i * (CHART_HEIGHT / (maxY / intervalY))}
        ></ChartLine>
      ))}
    </div>
  );
  const main = (
    <FlexBox style={{ width: "100%" }} column>
      <FlexBox
        style={{
          overflow: "hidden",
          paddingTop: LABEL_SIZE,
          justifyContent: "space-around",
          height: CHART_HEIGHT,
        }}
      >
        {[...Array(daysInMonth)].map((_, i) => {
          const d = days.find((d) => d.day == i + 1);
          return (
            <FlexBox
              key={`chart-bar-${i}`}
              style={{ width: "80%", minWidth: MIN_WIDTH_X }}
              column
              align="center"
              justify="end"
            >
              {d && (
                <ChartBar
                  onClick={() => setViewedDay(viewedDay == i ? null : i)}
                  key={`${i}-${d.value}`}
                  labelSize={LABEL_SIZE}
                  animation="popup"
                  text={`${d.value}`}
                  active={viewedDay == i}
                  height={(d.value / max) * (CHART_HEIGHT * (max / maxY))}
                ></ChartBar>
              )}
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
  );

  const axisX = (
    <FlexBox
      style={{
        borderTop: "1px solid",
        width: "100%",
        justifyContent: "space-around",
      }}
    >
      {[...Array(daysInMonth)].map((_, i) => {
        return (
          <FlexBox
            style={{ flex: 1, minWidth: MIN_WIDTH_X }}
            key={`axis-x-day-${i}`}
            justify="center"
          >
            {i + 1}
          </FlexBox>
        );
      })}
    </FlexBox>
  );

  const axisY = (
    <div style={{ height: CHART_HEIGHT }}>
      {[...Array(maxY / intervalY)].map((y, i) => (
        <ChartLine
          key={`axis-y-${i}`}
          label={maxY - i * intervalY}
          height={CHART_HEIGHT}
          position={i * (CHART_HEIGHT / (maxY / intervalY))}
        ></ChartLine>
      ))}
    </div>
  );

  return (
    <FlexBox style={{ width: "100%", paddingTop: LABEL_SIZE }}>
      <FlexBox column gapSize={5}>
        {axisY}
        <div style={{ opacity: 0, borderTop: "1px solid" }}>{maxY}</div>
      </FlexBox>
      <FlexBox
        column
        gapSize={5}
        style={{
          flex: 1,
        }}
      >
        <FlexBox
          style={{ height: CHART_HEIGHT, width: "100%", position: "relative" }}
        >
          {linesY}
          {main}
        </FlexBox>
        <FlexBox column>{axisX}</FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default BitvavoPortfolioChart;
