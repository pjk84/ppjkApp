import React, { useReducer } from "react";
import random from "random-words";
import { FlexBox, FlexBoxCentered } from "../styles/containers";
import { StdInput } from "../styles/input";
import { StdButton } from "../styles/buttons";

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
  boxShadow: "1px 1px 1px lightGray",
};

const colors = {
  green: {
    background: "#b2fcb2",
    text: "#306130",
  },
  red: {
    background: "#ffc1c1",
    text: "#572c2c",
  },
  yellow: {
    background: "#f8f8b6",
    text: "#959556",
  },
  transparent: {
    background: "transparent",
    text: "black",
  },
};

//awsedrfgth

const Wordle = () => {
  const evaluateInput = () => {
    const target = state.word;
    const asArray = state.input.split("");
    let result: Letter[] = [];
    for (const i in asArray) {
      const letter: string = asArray[i];
      if (target.indexOf(letter) === -1) {
        // word does not have letter
        result.push({ value: letter, color: "red" });
        continue;
      }
      if (target[+i] === letter) {
        result.push({ value: letter, color: "green" });
        continue;
      } else {
        result.push({ value: letter, color: "yellow" });
      }
    }
    return result;
  };

  const setError = (err: string) => {
    setState({ type: "ERROR", payload: err });
  };

  const handleWord = (e: React.FormEvent<HTMLFormElement>) => {
    // check new submit here
    e.preventDefault();
    if (state.input.length === WORD_LENGTH) {
      if (!/^[a-zA-Z]+$/.test(state.input)) {
        console.log("not al letters");
        return setError("only letters allowed (A-Z)");
      }
      return setState({
        type: "GUESS",
        payload: evaluateInput(),
      });
    }
    setError(`word must be ${WORD_LENGTH} letters`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ type: "INPUT", payload: e.target.value });
  };

  type Action = {
    type: string;
    payload?: any;
  };

  type Letter = {
    color: "transparent" | "red" | "yellow" | "green";
    value: string;
  };

  const WORD_LENGTH = 5; // make prop
  type State = {
    word: string;
    round: number;
    guesses: Letter[][];
    input: string;
    won: boolean;
    error?: string;
  };
  const getWord = (): string => {
    let word: string;
    while (true) {
      const [newWord]: string[] = random({
        exactly: 1,
        maxLength: WORD_LENGTH,
      });
      if (newWord.length === WORD_LENGTH) {
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
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "INPUT":
        return { ...state, input: action.payload };
      case "ERROR":
        return { ...state, error: action.payload };
      case "GUESS":
        const letters: Letter[] = action.payload;

        return {
          ...state,
          rount: state.round + 1,
          input: "",
          error: undefined,
          won:
            letters.filter((l) => l.color === "green").length === WORD_LENGTH,
          guesses: [...state.guesses, ...[action.payload]],
        };
      default:
        return { ...state };
    }
  };

  const [state, setState] = useReducer(reducer, initialState);

  return (
    <FlexBoxCentered gap={50} style={{ height: "100%" }}>
      {state.error && <div style={{ color: "red" }}>{`${state.error}`}</div>}
      {state.won && (
        <div
          style={{ color: `${colors.green.text}` }}
        >{`Congratulations, you win!`}</div>
      )}
      {state.guesses.length === 5 && !state.won && (
        <FlexBox column gapSize="large">
          <div style={{ color: "red" }}>
            {`game over. The target word was: ${state.word.toUpperCase()}`}
          </div>
        </FlexBox>
      )}
      <FlexBoxCentered gap={10}>
        {state.guesses.map((guess) => {
          return (
            <FlexBox gapSize="small">
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
                      animation: `0.1s ${
                        i / WORD_LENGTH
                      }s flipOver ease-out forwards`,
                    }}
                  >
                    {letter.value}
                  </div>
                );
              })}
            </FlexBox>
          );
        })}
        {Array.from(
          Array(5 - state.guesses.length)
            .fill(0)
            .map((row, r) => {
              return (
                <FlexBox gapSize="small">
                  {state.word.split("").map((letter, i) => {
                    return (
                      <div
                        style={{
                          ...boxStyle,
                          animation: `${Math.random()}s jitterIn`,
                        }}
                      >
                        {r === 0 && state.input[i]}
                      </div>
                    );
                  })}
                </FlexBox>
              );
            })
        )}
      </FlexBoxCentered>
      <form onSubmit={handleWord}>
        <FlexBoxCentered gap={20} style={{ width: "100%" }}>
          <StdInput
            value={state.input}
            onChange={handleInput}
            placeholder="guess.."
            style={{ fontSize: 15, padding: 10 }}
          />
          <StdButton size="small" type="submit">
            submit
          </StdButton>
        </FlexBoxCentered>
      </form>
    </FlexBoxCentered>
  );
};

export default Wordle;
