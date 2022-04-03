import React, { useState, useEffect } from "react";
import RestartButton from "../components/projects/speedType/Restartbutton";
import Score from "../components/projects/speedType/Score";
import Timer from "../components/projects/speedType/Timer";
import { appTheme } from "../styles";

// import "./speedtype.css";
import { FlexBox } from "../styles/containers";

type Props = {
  isPlaying: boolean;
  setIsPlaying: any;
  timesUp: boolean;
};
const SpeedType = () => {
  const random = require("random-words");

  const [gameState, setGameState] = useState<{
    isPlaying: boolean;
    timesUp: boolean;
    words: string[];
    input: string;
    cursor: number;
    roundResult: boolean[];
    totalResult: boolean[];
  }>({
    isPlaying: false,
    timesUp: false,
    words: random(10),
    input: "",
    cursor: 0,
    roundResult: [],
    totalResult: [],
  });
  const [focus, setFocus] = useState(false);

  const col = {
    animation: "0.2s fadeIn ease-in",
    display: "grid",
    gridTemplateRows: "60% 40%",
    // border: "1px solid #b3dadf",
    borderRadius: 8,
  };

  useEffect(() => {
    if (gameState.isPlaying) {
      if (gameState.words.length === gameState.roundResult.length) {
        setGameState({
          ...gameState,
          ...{
            words: random(10),
            cursor: 0,
            roundResult: [],
            totalResult: [...gameState.totalResult, ...gameState.roundResult],
          },
        });
      }
    }
  });

  const getScore = () => {
    console.log(gameState);
    return <Score score={gameState.totalResult} />;
  };

  const restart = () => {
    setGameState({
      ...gameState,
      ...{
        cursor: 0,
        input: "",
        words: random(10),
        roundResult: [],
        totalResult: [],
        timesUp: false,
      },
    });
  };

  const getWord = (word: string, index: number) => {
    return (
      <div
        key={`${word}-${index}-${gameState.roundResult[index] === true}`}
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: 8,
          padding: 10,
          // animation: result[index] === true && "0.5s evaporate ease-in",
          animation: !gameState.isPlaying
            ? `${(Math.random() * 5) / 10}s slideDown ease-out`
            : undefined,
          color:
            gameState.roundResult[index] === true
              ? `${appTheme.green}`
              : gameState.roundResult[index] === false
              ? "#ff4f38"
              : `white`,
          backgroundColor:
            gameState.isPlaying && index === gameState.cursor
              ? "#2b2d30"
              : undefined,
        }}
      >
        {word}
      </div>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({
      ...gameState,
      ...{ input: e.target.value, isPlaying: gameState.isPlaying || true },
    });
  };

  const main = gameState.timesUp ? (
    <>
      {getScore()}
      <RestartButton restart={restart} />
    </>
  ) : (
    <div style={col}>
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <div
            id="speedTypeWords"
            style={{
              justifyContent: "center",
              flexWrap: "wrap",
              display: "flex",
              gap: "5px",
            }}
          >
            {gameState.words.map((word: string, index: number) =>
              getWord(word, index)
            )}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            className="speedTypeInput"
            key="speedTypeInp"
            style={{
              overflow: "hidden",
              animation: !gameState.isPlaying
                ? "1s breathe infinite"
                : undefined,
              position: "relative",
              backgroundColor: "transparent",
              border: "none",
              color: `${appTheme.lightGray}`,
              boxSizing: "border-box",
              textAlign: "center",
            }}
            onKeyDown={(e) => {
              if (e.code === "Space") {
                const res =
                  gameState.input.trim().toLowerCase() ===
                  gameState.words[gameState.cursor].trim().toLowerCase();
                const roundResult = [...gameState.roundResult, ...[res]];
                setGameState({
                  ...gameState,
                  ...{ roundResult, cursor: gameState.cursor + 1, input: "" },
                });
              }
            }}
            placeholder={focus ? "" : "type here to start timer"}
            onFocus={(e) => setFocus(true)}
            onBlur={(e) => setFocus(false)}
            value={gameState.input}
            onChange={handleChange}
          />
        </div>
      </>
    </div>
  );

  return (
    <FlexBox align="center" justify="center" style={{ height: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "80% 20%",
          minHeight: 500,
        }}
      >
        {main}
        {!gameState.timesUp && (
          <Timer
            isPlaying={gameState.isPlaying}
            minutes={1}
            endGame={() =>
              setGameState({
                ...gameState,
                ...{ timesUp: true, isPlaying: false },
              })
            }
          />
        )}
      </div>
    </FlexBox>
  );
};

export default SpeedType;
