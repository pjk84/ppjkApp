import React, { useReducer, useEffect } from "react";
import random from "random-words";
import { FlexBox, FlexBoxCentered } from "../styles/containers";
import { StdInput } from "../styles/input";
import { StdButton } from "../styles/buttons";
import { resourceLimits } from "worker_threads";

const WORD_LENGTH = 5;
const GRID_GAP_SIZE = 10;

const evaluateInput = (target: string, guess: string[]) => {
  let result: Letter[] = [];
  let i = 0;

  // find matches
  for (const letter of guess) {
    if (target[i] === letter) {
      result.push({ value: letter, color: "green", index: i });
    } else {
      result.push({ value: letter, color: "transparent", index: i });
    }
    i++;
  }
  // find misplacements;
  const didNotMatch = result.filter((r) => r.color !== "green");
  const targetNotYetMatched = didNotMatch
    .map((r) => r.index)
    .map((i) => target[i]);

  for (const letter of didNotMatch) {
    const i = targetNotYetMatched.indexOf(letter.value);
    if (i !== -1) {
      // letter exists in target but was not in the right position
      result[letter.index].color = "yellow";

      // remote letter from target
      targetNotYetMatched.splice(i, 1);
    }
  }
  return result;
};

type Action = {
  type: string;
  payload?: any;
};

type Letter = {
  color: "transparent" | "red" | "yellow" | "green";
  value: string;
  index: number;
};

type State = {
  word: string;
  round: number;
  guesses: Letter[][];
  input: string;
  won: boolean;
  isPlaying: boolean;
  error?: string;
  focused?: boolean;
};

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid lightGray",
  fontSize: 25,
  padding: 5,
  width: 40,
  height: 40,
  backgroundColor: "white",
  color: "black",
  borderRadius: 4,
  boxShadow: "1px 1px 2px lightGray",
};

const colors = {
  green: {
    background: "#9aff9a",
    text: "#306130",
  },
  red: {
    background: "#ffc1c1",
    text: "#572c2c",
  },
  yellow: {
    background: "#ffffa3",
    text: "#959556",
  },
  transparent: {
    background: "white",
    text: "#9c9c9c",
  },
};

const Wordle = () => {
  const getWord = (): string => {
    const len =
      (localStorage.getItem("wordleWordLength") &&
        Number(localStorage.getItem("wordleWordLength"))) ||
      WORD_LENGTH;
    while (true) {
      const [newWord]: string[] = random({
        exactly: 1,
        maxLength: len,
      });
      if (newWord.length === len) {
        return newWord;
      }
    }
  };

  const initialState: State = {
    word: getWord(),
    guesses: [],
    round: 0,
    input: "",
    won: false,
    isPlaying: false,
  };
  const setError = (err: string) => {
    setState({ type: "ERROR", payload: err });
  };

  const reset = () => {
    setState({ type: "RESET" });
  };

  const handleWord = (e: React.FormEvent<HTMLFormElement>) => {
    // check new submit here
    e.preventDefault();
    if (state.input.length === state.word.length) {
      if (!/^[a-zA-Z]+$/.test(state.input)) {
        console.log("not al letters");
        return setError("only letters allowed (A-Z)");
      }
      return setState({
        type: "GUESS",
        payload: evaluateInput(state.word, state.input.split("")),
      });
    }
    setError(`word must be ${WORD_LENGTH} letters`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ type: "INPUT", payload: e.target.value });
  };

  const setWordLength = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("wordleWordLength", e.target.value);
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "INPUT":
        return { ...state, input: action.payload, isPlaying: true };
      case "ERROR":
        return { ...state, error: action.payload };
      case "FOCUS_INPUT":
        return { ...state, focused: true };
      case "BLUR_INPUT":
        return { ...state, focused: false };
      case "RESET":
        return {
          ...initialState,
          //   word: getWord(len),
          //   wordLength: len,
        };
      case "GUESS":
        const letters: Letter[] = action.payload;

        return {
          ...state,
          rount: state.round + 1,
          input: "",
          error: undefined,
          won:
            letters.filter((l) => l.color === "green").length ===
            state.word.length,
          guesses: [...state.guesses, ...[action.payload]],
        };
      default:
        return { ...state };
    }
  };

  const [state, setState] = useReducer(reducer, initialState);

  const messages = (
    <>
      {state.error && <div style={{ color: "red" }}>{`${state.error}`}</div>}
      {state.won && (
        <div
          style={{ color: `${colors.green.text}` }}
        >{`Congratulations, you win!`}</div>
      )}
      {state.guesses.length === state.word.length && !state.won && (
        <FlexBox column gapSize="large">
          <div style={{ color: "red" }}>
            {`game over. The target word was: ${state.word.toUpperCase()}`}
          </div>
        </FlexBox>
      )}
    </>
  );

  const guesses = state.guesses.map((guess, g) => {
    return (
      <FlexBox key={`guess-${g}`} gapSize={GRID_GAP_SIZE}>
        {guess.map((letter: Letter, i: number) => {
          return (
            <div
              key={`${letter}-${i}-result`}
              style={{
                ...boxStyle,
                opacity: 0,
                background: colors[letter.color].background,
                color: colors[letter.color].text,
                borderColor: colors[letter.color].text,
                animation: `0.25s ${
                  i / state.word.length
                }s flipOver ease-out forwards`,
              }}
            >
              {letter.value}
            </div>
          );
        })}
      </FlexBox>
    );
  });

  const emptyBlocks = Array.from(
    Array(state.word.length - state.guesses.length)
      .fill(0)
      .map((row, r) => {
        return (
          <FlexBox key={`row-${r}`} gapSize={GRID_GAP_SIZE}>
            {state.word.split("").map((letter, i) => {
              return (
                <div
                  key={`${letter}-${i}-placeholder`}
                  style={{
                    ...boxStyle,
                    animation:
                      r === 0 && state.input[i]
                        ? "0.2s popIn ease-in"
                        : !state.isPlaying
                        ? `${Math.random()}s jitterIn`
                        : undefined,
                  }}
                >
                  {r === 0 && state.input[i]}
                </div>
              );
            })}
          </FlexBox>
        );
      })
  );

  const input = (
    <form onSubmit={handleWord} style={{ marginTop: 20 }}>
      <FlexBoxCentered gap={20}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <StdInput
            onFocus={() => setState({ type: "FOCUS_INPUT" })}
            onBlur={() => setState({ type: "BLUR_INPUT" })}
            value={state.input}
            onChange={handleInput}
            placeholder={state.focused ? "" : "guess here..."}
            style={{
              textAlign: "center",
              fontSize: 15,
              height: "3em",
            }}
          />
        </span>
      </FlexBoxCentered>
    </form>
  );

  const settings = (
    <FlexBoxCentered gap={10}>
      <FlexBox gapSize="small">
        <label>word length</label>

        <select
          id="word_length_select"
          onChange={setWordLength}
          defaultValue={state.word.length}
        >
          {Array.from(Array(6).keys()).map((n) => {
            const v = n + 5;
            return (
              <option key={`word_length_opt-${n}`} value={v}>
                {v}
              </option>
            );
          })}
        </select>
      </FlexBox>
      <StdButton size="small" type="submit" onClick={reset}>
        reset
      </StdButton>
    </FlexBoxCentered>
  );

  return (
    <FlexBoxCentered gap={50}>
      {messages}
      {/* <div>{state.word}</div> */}
      <FlexBox column gapSize={GRID_GAP_SIZE}>
        {guesses}
        {emptyBlocks}
        {input}
      </FlexBox>
      {settings}
    </FlexBoxCentered>
  );
};

export default Wordle;
