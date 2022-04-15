import React from "react";
import { useEffect, useState } from "react";

const Timer = ({ isPlaying, minutes, endGame }) => {
  const [time, setTime] = useState({ minutes: `0${minutes}`, seconds: "00" });

  useEffect(
    () => {
      if (isPlaying) {
        const timer = setTimeout(() => {
          if (time.seconds === "00") {
            setTime({
              ...time,
              minutes: `0${parseFloat(time.minutes) - 1}`,
              seconds: "59",
            });
          } else {
            const singleDigit = parseFloat(time.seconds) - 1 < 10;
            setTime({
              ...time,
              minutes: `0${parseFloat(time.minutes)}`,
              seconds: `${singleDigit ? "0" : ""}${
                parseFloat(time.seconds) - 1
              }`,
            });
          }
        }, 1000);
        if (parseFloat(time.minutes) === 0 && parseFloat(time.seconds) === 0) {
          endGame();
        }
        return () => clearTimeout(timer);
      } else {
        if (time.minutes !== `0${minutes}` && time.seconds !== "00")
          setTime({ minutes: `0${minutes}`, seconds: "00" });
      }
    },
    [minutes, isPlaying, time, setTime],
    [endGame]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "0.3s fadeIn ease-in",
        fontSize: 50,
      }}
    >{`${time.minutes}:${time.seconds}`}</div>
  );
};

export default Timer;
