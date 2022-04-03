import React from "react";
import { useRouter } from "next/router";

const RestartButton = ({ restart }) => {
  return (
    <button
      onClick={restart}
      style={{
        width: 200,
        backgroundColor: "transparent",
        border: "1px solid #9ba4ab",
        cursor: "pointer",
        fontSize: 20,
        animation: "0.5s slideLeft ease-out",
        borderRadius: 4,
        color: "#9ba4ab",
        height: "max-content",
        padding: 10,
      }}
    >
      restart
    </button>
  );
};
export default RestartButton;
