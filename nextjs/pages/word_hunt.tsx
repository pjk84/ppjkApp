import React, { useEffect, useState, useRef, ReactEventHandler } from "react";
import { FlexBox, FlexBoxCentered } from "../styles/containers";
import { Header1, Header2 } from "../styles/header";
import { v4 } from "uuid";
import { appTheme } from "../styles";
// import "./wordhunt.css";

type WordItem = {
  id: string;
  name: string;
  fontSize: number;
  opacity: number;
  coords: Array<number>;
  velocity: number;
  fallHeight?: number;
  lifeSpan?: number;
};

type Props = {
  interval: number;
};

const WordInvader = ({ interval }: Props) => {
  interval = 5;
  const fieldHeight = 500;
  const fieldWidth = 800;
  const wordHeight = 30;
  const buffer = 120;
  const random = require("random-words");
  const [words, setWords] = useState<WordItem[]>([]);
  const [crashing, setCrashing] = useState<WordItem[]>([]);
  const [playing, setPlaying] = useState(false);
  const [input, setInput] = useState("");
  const [timer, manageTimer] = useState({
    ticks: 0,
    remainder: 0,
    interval: interval,
  });
  const [focus, setFocus] = useState(false);
  const [score, setScore] = useState({
    total: 0,
    chunk: 0,
  });

  const getRandomNumber = (min: number, max: number) => {
    let r = Math.ceil(Math.random() * max);
    return r < min ? min : r;
  };

  const allWords = words.map((wordItem: WordItem) => {
    return (
      <div
        id={wordItem.id}
        key={wordItem.id}
        style={{
          fontSize: `${wordItem.fontSize}px`,
          backgroundColor: "transparent",
          position: "absolute",
          transition: "all 0.1s linear",
          top: wordItem.coords[1],
          left: wordItem.coords[0],
          color: `${appTheme.green}`,
          opacity: wordItem.opacity,
        }}
      >
        {wordItem.name}
      </div>
    );
  });
  const crashingWords = crashing.map((wordItem: WordItem) => {
    return (
      <div
        id={wordItem.id}
        key={wordItem.id}
        style={{
          fontSize: `${wordItem.fontSize}px`,
          backgroundColor: "transparent",
          position: "absolute",
          transition: `all ${
            (fieldHeight - wordItem.fallHeight!) / fieldHeight
          }s linear`,
          top: wordItem.coords[1],
          left: wordItem.coords[0],
          opacity: 0.1,
        }}
      >
        {wordItem.name}
      </div>
    );
  });
  const myRef = useRef(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if (!playing) {
      if (input === "start") {
        setPlaying(true);
        return setInput("");
      }
    }
    setInput(input);
    const i = words.findIndex((word) => word.name === e.target.value);
    if (i !== -1) {
      // word matches. Pop the word from the array
      // increment score by 10 if it was the last remaining word on screen (bonus)
      const adder = words.length === 1 ? 10 : 1;
      setScore({
        ...score,
        total: score.total + adder,
        chunk: score.chunk + adder >= buffer ? 0 : score.chunk + adder,
      });
      setInput("");
      setCrashing([
        ...crashing,
        ...[
          {
            ...words[i],
            fallHeight: words[i].coords[1],
            lifeSpan: Math.ceil(10 - (words[i].coords[1] / fieldHeight) * 10),
          },
        ],
      ]);
      return setWords([...words.slice(0, i), ...words.slice(i + 1)]);
    }
  };

  useEffect(() => {
    if (!playing) return;
    const addWord = (words: WordItem[]): WordItem[] => {
      return [
        ...words,
        ...Array.from(Array(getRandomNumber(2, 5))).map((n) => {
          return {
            id: v4(),
            name: random(1)[0],
            fontSize: getRandomNumber(30, 50),
            coords: [0, getRandomNumber(0, fieldHeight - wordHeight)],
            velocity: getRandomNumber(3, 10),
            opacity: 0.4,
          };
        }),
      ];
    };
    // console.log(myRef.current/v)

    words.forEach((w: WordItem) => {
      // check if any words have reached the right edge of the field
      if (w.coords[0] - w.velocity >= fieldWidth) {
        document!.getElementById(w.id)!.style.opacity = "0";
        return setPlaying(false);
      }
    });
    const i = setInterval(() => {
      const moved: WordItem[] = words.map((word: WordItem) => {
        return {
          ...word,
          ...{ coords: [word.coords[0] + word.velocity, word.coords[1]] },
        };
      });
      const moveCrashing = crashing
        .map((crashingWord: WordItem) => {
          return {
            ...crashingWord,
            lifeSpan: crashingWord.lifeSpan! - 1,
            coords: [crashingWord.coords[0], fieldHeight],
          };
        })
        .filter((m) => m.lifeSpan > 0);
      const currentInterval =
        score.chunk === 0 ? timer.interval - 1 : timer.interval;
      if (timer.ticks >= 10) {
        setCrashing(moveCrashing);
        if (timer.remainder <= 0) {
          manageTimer({
            ...timer,
            remainder: currentInterval,
            ticks: 0,
            interval: currentInterval,
          });
          return setWords(addWord(moved));
        }
        manageTimer({
          ...timer,
          remainder: timer.remainder - 1,
          ticks: 0,
        });
        return setWords(moved);
      }
      setCrashing(moveCrashing);
      manageTimer({ ...timer, ticks: timer.ticks + 1 });
      setWords(moved);
    }, 100);

    return () => {
      clearInterval(i);
    };
  }, [random, words, playing, timer, crashing, interval, score]);

  return (
    <FlexBox key="outer" gapSize="large" column>
      {/* <button onClick={test}>test</button> */}
      <div
        style={{
          border: "30px solid",
          borderImage: "linear-gradient( to bottom right,#242424, #1d1d1d) 1",
          borderRadius: 10,
        }}
      >
        <div
          key="wordspace"
          id="wordSpace"
          style={{
            overflow: "hidden",
            height: fieldHeight,
            position: "relative",

            background: "radial-gradient(#6b816b, #1d201e 95%)",
            boxShadow: "inset 10px 0 50px #171a19",
            animation: !playing ? "0.2s jitterIn ease-in" : undefined,
          }}
        >
          <Header1
            style={{
              color: `${appTheme.green}`,
              opacity: 0.5,
              width: "max-content",
              position: "absolute",
              left: 5,
              top: 5,
            }}
          >
            score: {score.total}
          </Header1>
          {!playing ? (
            <div
              style={{
                position: "absolute",
                display: "flex",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
                padding: 100,
                opacity: 0.5,
                fontSize: 60,
              }}
            >
              {words.length === 0 ? (
                <div style={{ fontSize: 30 }}>
                  Random words will enter the screen from the left. Pop them by
                  typing them correctly before they reach the opposite end of
                  the screen. The volume and frequency of words will increase as
                  you accumulate points.
                </div>
              ) : (
                <div>GAME OVER</div>
              )}
            </div>
          ) : (
            <>
              {allWords}
              {crashingWords}
            </>
          )}
        </div>
      </div>
      <input
        style={{
          fontSize: 25,
          color: `${appTheme.green}`,
          backgroundColor: "transparent",
          textAlign: "center",
          border: "none",
        }}
        placeholder={
          focus
            ? undefined
            : playing
            ? "type here"
            : "type 'start' to start game"
        }
        ref={myRef}
        value={input}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        onChange={handleInput}
      />
    </FlexBox>
  );
};

export default WordInvader;
