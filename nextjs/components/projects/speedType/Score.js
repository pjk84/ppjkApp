import React from "react";
import { FlexBoxCentered } from "../../../styles/containers";

export const Score = ({ score }) => {
  return (
    <FlexBoxCentered
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ animation: "0.2s slideDown ease-out" }}>your results: </h1>
      <h3
        style={{ animation: "0.5s slideRight ease-out" }}
      >{`word count: ${score.length}`}</h3>
      <h3 style={{ animation: "0.5s slideLeft ease-out" }}>{`errors: ${
        score.length - score.filter((res) => res === true).length
      }`}</h3>
      <h3
        style={{ animation: "0.5s slideUp ease-out" }}
      >{`accuracy: ${Math.round(
        (score.filter((res) => res === true).length / score.length) * 100
      )}%`}</h3>
      <div style={{ marginTop: 25 }}></div>
    </FlexBoxCentered>
  );
};

export default Score;
