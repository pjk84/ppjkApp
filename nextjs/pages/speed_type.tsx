import React, { useState, useEffect, useRef } from "react";
import Score from "../components/projects/speedType/Score";
import Timer from "../components/projects/speedType/Timer";
import { appTheme, appThemeLight } from "../styles";
import { StdButton } from "../styles/buttons";
import { FlexBox, FlexBoxCentered } from "../styles/containers";

const SpeedType = () => {
  const random = require("random-words");
  const ref1 = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(
    localStorage.getItem("speedtype_show_cursor") === "true"
  );
  const [showErrors, setShowErrors] = useState(
    localStorage.getItem("speedtype_show_errors") === "true"
  );
  const wordsPerLine = 10;

  const initialState = {
    isPlaying: false,
    timesUp: false,
    words: Array(2)
      .fill([])
      .map((w) => random(wordsPerLine)),
    input: "",
    cursor: 0,
    scroll: false,
    roundResult: [],
    totalResult: [],
    set: 0,
    height: 0,
  };

  const [gameState, setGameState] = useState<{
    isPlaying: boolean;
    timesUp: boolean;
    words: string[][];
    input: string;
    scroll: boolean;
    cursor: number;
    roundResult: boolean[];
    totalResult: boolean[];
    set: number;
    height: number;
  }>(initialState);
  const [focus, setFocus] = useState(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "r") {
      setGameState(initialState);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, true);

    const getHeight = (c: HTMLCollection) => {
      const h =
        c[gameState.set].clientHeight + c[gameState.set + 1].clientHeight;
      return h;
    };
    if (ref1.current && gameState.height === 0) {
      setGameState({ ...gameState, height: getHeight(ref1.current.children) });
    }
    if (gameState.isPlaying) {
      if (gameState.roundResult.length === wordsPerLine) {
        if (ref1.current) {
          const children: { clientHeight: number }[] = [].slice.call(
            ref1.current.children
          );
          let h: number = 0;
          for (const c of children.slice(0, gameState.set + 1)) {
            h += c.clientHeight;
          }
          ref1.current.style.transform = `translateY(-${h}px)`;
          setGameState({
            ...gameState,
            ...{
              cursor: 0,
              words: [...gameState.words, random(wordsPerLine)],
              set: gameState.set + 1,
              height: getHeight(ref1.current.children),
              roundResult: [],
            },
          });
        }
      }
    }
    return () => {
      // cleanup
      window.removeEventListener("keydown", handleKeyPress, true);
    };
  }, [setGameState, gameState, handleKeyPress]);

  const getScore = () => {
    return <Score score={gameState.totalResult} />;
  };

  const wordstyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    color: `${appTheme.darkGray}`,
  };

  const handleCursor = () => {
    localStorage.setItem("speedtype_show_cursor", String(!showCursor));
    setShowCursor(!showCursor);
  };
  const handleShowErrors = () => {
    localStorage.setItem("speedtype_show_errors", String(!showErrors));
    setShowErrors(!showErrors);
  };

  const getLetters = (word: string) => {
    const input = gameState.input.toLowerCase().trim().split("");

    let w = word.split("");
    if (showErrors) {
      w = [...w, ...input.slice(word.length)];
    }

    return (
      <>
        {w.map((letter, i) => {
          const overFlow = i > word.length - 1;
          return (
            <div
              key={`letter_${i}_word`}
              style={{
                position: "relative",
                ...(showErrors && {
                  textDecoration: overFlow ? "line-through" : "normal",
                  color: overFlow
                    ? "red"
                    : i < input.length
                    ? letter === input[i]
                      ? "green"
                      : "red"
                    : undefined,
                }),
              }}
            >
              {letter}
              {
                // show overflow
              }
              {showCursor && i === input.length && (
                <div
                  style={{
                    height: 2,
                    backgroundColor: "black",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const getWord = (set: number, word: string, index: number) => {
    const activeWord =
      set === Math.floor(gameState.totalResult.length / wordsPerLine) &&
      index === gameState.cursor;
    return (
      <FlexBox
        key={`${word}-${index}-${gameState.roundResult[index] === true}`}
        style={{
          ...wordstyle,
          ...(set === gameState.set && {
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
        {activeWord ? getLetters(word) : word}
      </FlexBox>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({
      ...gameState,
      ...{ input: e.target.value, isPlaying: gameState.isPlaying || true },
    });
  };

  const handlekey = () => {
    const res =
      gameState.input.trim().toLowerCase() ===
      gameState.words[gameState.set][gameState.cursor].trim().toLowerCase();
    const roundResult = [...gameState.roundResult, ...[res]];
    const totalResult = [...gameState.totalResult, ...[res]];
    setGameState({
      ...gameState,
      ...{
        roundResult,
        totalResult,
        cursor: gameState.cursor + 1,
        input: "",
      },
    });
  };

  const settings = (
    <FlexBox column gapSize="small" key="show_cursor">
      <FlexBox>
        <input
          key="config_api_dotnet"
          defaultChecked={showCursor}
          onChange={handleCursor}
          type="checkbox"
        />
        <label>show cursor</label>
      </FlexBox>
      <FlexBox>
        <input
          key="config_api_dotnet"
          defaultChecked={showErrors}
          onChange={handleShowErrors}
          type="checkbox"
        />
        <label>show errors</label>
      </FlexBox>
    </FlexBox>
  );

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
        width: "100%",
      }}
      onKeyDown={(e) => {
        if (e.code === "Space" || e.code === "Enter") {
          handlekey();
        }
      }}
      placeholder={
        focus ? "" : "type here to start timer. (press ctrl+r to restart)"
      }
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
        transitionTimingFunction: "ease-in",
        transition: "0.3s all",
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
      <StdButton size="small" onClick={() => setGameState(initialState)}>
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
    <FlexBoxCentered style={{ height: "100%", gap: 50 }}>
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
      {settings}
    </FlexBoxCentered>
  );
};

export default SpeedType;
