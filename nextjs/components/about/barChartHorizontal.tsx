import React, { useEffect, useRef, useState } from "react";
import { FlexBox } from "../../styles/containers";
import { Header1 } from "../../styles/header";
import { AxisX, AxisXPoint, BarHorizontal } from "../../styles/barGraph";

interface BarChartDetails {
  name: string;
  label: string;
  value: number;
}

interface DetailsArray {
  title: string;
  data: BarChartDetails[];
}

const OPTIONS = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0,
};

const BarChartHorizontal = ({ data, title }: DetailsArray) => {
  var barHeight = 30;
  //container height should be roughtly equal to combined barheight
  // this way intersection threshold is close to chart height
  const minHeight = data.length * barHeight + barHeight;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const maxExp = Math.max(...data.map((l) => l.value));

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

  const inner = (
    <div>
      <Header1
        style={{ height: barHeight, justifyContent: "left", marginBottom: 10 }}
      >
        {title}
      </Header1>
      <FlexBox column gapSize={10} style={{ overflow: "hidden" }}>
        {data.map((l) => (
          <BarHorizontal
            text={l.label}
            key={`bar-${l.label}`}
            style={{
              animation: `grow 0.5s ease-out `,
              height: barHeight,
              width: `${(l.value / maxExp) * 100}%`,
            }}
          ></BarHorizontal>
        ))}
      </FlexBox>
      <AxisX text="years">
        {Array.from(Array(maxExp).keys()).map((e) => (
          <AxisXPoint
            key={`axis-${e}`}
            text={`${e + 1}`}
            width={`${(1 / maxExp) * 100}%`}
          ></AxisXPoint>
        ))}
      </AxisX>
    </div>
  );

  return (
    <FlexBox style={{ minHeight: minHeight }} ref={ref} gapSize="medium" column>
      {isVisible ? inner : null}
    </FlexBox>
  );
};
``;

export default BarChartHorizontal;
