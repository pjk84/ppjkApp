import React, { useState, useEffect, useRef } from "react";
import Score from "../components/projects/speedType/Score";
import Timer from "../components/projects/speedType/Timer";
import { appTheme, appThemeLight } from "../styles";
import { StdButton } from "../styles/buttons";

// import "./speedtype.css";
import { FlexBox, FlexBoxCentered } from "../styles/containers";

type Props = {
  isPlaying: boolean;
  setIsPlaying: any;
  timesUp: boolean;
};
const SpeedType = () => {
  const random = require("random-words");

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<{
    isPlaying: boolean;
    timesUp: boolean;
    words: string[][];
    input: string;
    scroll: boolean;
    cursor: number;
    roundResult: boolean[];
    totalResult: boolean[];
    line: number;
    height: number;
  }>({
    isPlaying: false,
    timesUp: false,
    words: Array(2)
      .fill([])
      .map((w) => random(10)),
    input: "",
    cursor: 0,
    scroll: false,
    roundResult: [],
    totalResult: [],
    line: 0,
    height: 0,
  });
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    let h: number = 0;
    const getHeight = (c: HTMLCollection) => {
      const h =
        c[gameState.line].clientHeight + c[gameState.line + 1].clientHeight;
      return h;
    };
    if (ref1.current && gameState.height === 0) {
      setGameState({ ...gameState, height: getHeight(ref1.current.children) });
    }
    if (gameState.isPlaying) {
      if (
        gameState.words[gameState.line].length === gameState.roundResult.length
      ) {
        if (ref1.current) {
          const children: { clientHeight: number }[] = [].slice.call(
            ref1.current.children
          );
          let h: number = 0;
          for (const c of children.slice(0, gameState.line + 1)) {
            h += c.clientHeight;
          }
          ref1.current.style.transform = `translateY(-${h}px)`;
          setGameState({
            ...gameState,
            ...{
              cursor: 0,
              words: [...gameState.words, random(10)],
              line: gameState.line + 1,
              height: getHeight(ref1.current.children),
              roundResult: [],
              totalResult: [...gameState.totalResult, ...gameState.roundResult],
            },
          });
        }
      }
    }
  }, [setGameState, gameState]);

  const getScore = () => {
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

  const wordstyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    // animation: result[index] === true && "0.5s evaporate ease-in",

    color: `${appTheme.darkGray}`,
  };

  const getWord = (line: number, word: string, index: number) => {
    return (
      <div
        key={`${word}-${index}-${gameState.roundResult[index] === true}`}
        style={{
          ...wordstyle,
          ...(line === gameState.line && {
            color:
              gameState.roundResult[index] === true
                ? `${appTheme.green}`
                : gameState.roundResult[index] === false
                ? "#ff4f38"
                : `${appTheme.darkGray}`,
            backgroundColor:
              gameState.isPlaying && index === gameState.cursor
                ? `${appThemeLight.lighterGray}`
                : undefined,
          }),
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

  const input = (
    <input
      key="speedTypeInp"
      style={{
        overflow: "hidden",
        animation: !gameState.isPlaying ? "1s breathe infinite" : undefined,
        position: "relative",
        backgroundColor: "transparent",
        border: "none",
        fontSize: 20,
        marginTop: 25,
        color: `${appTheme.darkGray}`,
        boxSizing: "border-box",
        textAlign: "center",
      }}
      onKeyDown={(e) => {
        if (e.code === "Space") {
          const res =
            gameState.input.trim().toLowerCase() ===
            gameState.words[gameState.line][gameState.cursor]
              .trim()
              .toLowerCase();
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
  );

  const words = (
    <FlexBox
      ref={ref1}
      column
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: 40,
        height: gameState.height,
        transition: "0.5s all ease-out",
      }}
    >
      {gameState.words.map((w, line) => (
        <FlexBox
          id={`words-line-${line}`}
          key={`words-line-${line}`}
          justify="center"
          wrap="true"
        >
          {w.map((word: string, index: number) => getWord(line, word, index))}
        </FlexBox>
      ))}
    </FlexBox>
  );

  const main = gameState.timesUp ? (
    <>
      {getScore()}
      <StdButton size="small" onClick={restart}>
        restart
      </StdButton>
    </>
  ) : (
    <FlexBoxCentered style={{ width: "100%" }}>
      <div
        style={{
          position: "relative",
          borderRadius: 8,
          width: "100%",
          height: gameState.height,
          overflow: "hidden",
        }}
      >
        {words}
      </div>
      {input}
    </FlexBoxCentered>
  );

  return (
    <FlexBox
      align="center"
      justify="center"
      column
      gapSize="large"
      style={{ height: "100%" }}
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
    </FlexBox>
  );
};

export default SpeedType;
