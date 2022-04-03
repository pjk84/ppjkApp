import React from "react";
import { FlexBox } from "../styles/containers";

const Table = ({ details, animation }) => {
  const exclude = ["id", "title", "demo"];

  const getSliding = (d, i) => {
    return (
      <tr
        key={`section-row-slide-${d}-${i}`}
        style={{
          backgroundColor: i % 2 === 0 && "#232526",
          animation: `0.${i + 1}s slideOverRight ease-out`,
        }}
      >
        <td style={{ padding: 5, width: "25%" }}>{d.replaceAll("_", " ")}</td>
        <td>
          {d === "repo" ? (
            <a style={{ color: "#58e087" }} href={details[d]}>
              click here
            </a>
          ) : (
            details[d]
          )}
        </td>
      </tr>
    );
  };

  const getJitterIn = (d, i) => {
    return (
      <tr key={`section-row-jitter-${d}-${i}`}>
        <td
          style={{
            width: "25%",
            backgroundColor: i % 2 === 0 && "#232526",
            padding: 10,
            animation: `0.${Math.random() + 7}s jitterIn ease-out`,
          }}
        >
          {d.replace(/_/g, " ")}
        </td>
        <td
          style={{
            backgroundColor: i % 2 === 0 && "#232526",
            animation: `0.${Math.random() + 7}s jitterIn ease-out`,
          }}
        >
          {d === "repo" ? (
            <a style={{ color: "#58e087" }} href={details[d]}>
              click here
            </a>
          ) : (
            details[d]
          )}
        </td>
      </tr>
    );
  };

  const getBuildup = (d, i) => {
    const r = Math.random();
    return (
      <tr key={`section-row-jitter-${d}-${i}`}>
        <td
          style={{
            width: "25%",
            animation: `${1 - i / 10}s jitter`,
            backgroundColor: i % 2 === 0 && "#232526",
            padding: 5,
          }}
        >
          {d.replace(/_/g, " ")}
        </td>
        <td
          style={{
            animation: `${1 - i / 10}s slideDown`,
            backgroundColor: i % 2 === 0 && "#232526",
          }}
        >
          {d === "repo" ? (
            <a style={{ color: "#58e087" }} href={details[d]}>
              click here
            </a>
          ) : (
            details[d]
          )}
        </td>
      </tr>
    );
  };

  return (
    <FlexBox justify="center">
      <table style={{ width: "100%", fontSize: 18, wordBreak: "break-all" }}>
        <tbody>
          {Object.keys(details).map(
            (d, i) =>
              !exclude.includes(d) &&
              (animation === "slide"
                ? getSliding(d, i)
                : animation === "jitter"
                ? getJitterIn(d, i)
                : animation === "build"
                ? getBuildup(d, i)
                : null)
          )}
        </tbody>
      </table>
    </FlexBox>
  );
};

export default Table;
