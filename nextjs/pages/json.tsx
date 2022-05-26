import { chunk } from "lodash";
import { HtmlProps } from "next/dist/shared/lib/utils";
import { format } from "path";
import React, { useState, useRef, useEffect, ReactElement } from "react";
import { json, text } from "stream/consumers";
import { FlexBox, FlexBoxCentered } from "../styles/containers";

type Chunk = {
  isStr: boolean;
  c: string;
};
const Json = () => {
  const [code, setCode] = useState("");
  const [chunks, setChunks] = useState<Chunk[][]>();

  //   const [lines, setLines] = useState<{ depth: Number; c: string }[]>();
  const cursor = useRef(0);
  const hasDeleted = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let v = e.target.value;
    if (textArea.current) {
      const n = textArea.current.selectionEnd;
      if (v[n - 1] === "{") {
        console.log(hasDeleted);
        if (hasDeleted.current) {
          console.log("hasDeleted");
          hasDeleted.current = false;
        } else {
          console.log("pairing bracket", v);
          v = v.slice(0, n) + "}" + v.slice(n);
        }
      }
      cursor.current = textArea.current.selectionEnd;
    }
    console.log("change");
    setCode(v);
  };

  const handleClick = () => {
    if (textArea.current) {
      const elem = textArea.current as HTMLTextAreaElement;
      console.log("set cursor position to: ", elem.selectionStart);
      cursor.current = elem.selectionEnd;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace") {
      // delete bracket pairs
      hasDeleted.current = true;
      if (code[cursor.current - 1] === "{") {
        if (code[cursor.current] !== "}") return;
        let v = code.slice(0, cursor.current - 1) + code.slice(cursor.current);
        setCode(v);
      }
    }
    if (e.key === "ArrowLeft") {
      if (cursor.current > 0) {
        cursor.current = cursor.current - 1;
        console.log("cursor position is now ", cursor.current);
      }
    }
    if (e.key === "ArrowRight") {
      if (cursor.current < code.length) {
        cursor.current = cursor.current + 1;
        console.log("cursor position is now ", cursor.current);
      }
    }
    if (e.key === "Enter") {
      console.log("enter");
    }
  };

  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (code.length === 0) {
      hasDeleted.current = false;
    }
    console.log("update", cursor.current);
    if (textArea.current) {
      const elem = textArea.current as HTMLTextAreaElement;
      elem.setSelectionRange(cursor.current, cursor.current);
    }
  });

  // const handleKeyDown = (e: React.KeyboardEvent) => {};

  const makeLines = () => {
    let formatted: string[] = [];
    let lenTotal: number = 0;
    let depth = 0;
    // const checkDepth = (chunks: Chunk[]): number => {
    //   // check for brackets in non-stringified chunks
    //   const flat = chunks
    //     .map((c) => c.c)
    //     .flat()
    //     .join();
    //   const open = flat.match(/{/g) || [];
    //   const close = flat.match(/}/g) || [];
    //   if (open.length > close.length) {
    //     // increase indent by 1
    //     return 1;
    //   }

    //   if (open.length < close.length) {
    //     // decrease by 1
    //     return -1;
    //   }
    //   // keep current indentation
    //   return 0;
    // };
    const getLine = (i: number, line: string) => {
      // remove tabs and tab-indent from scratch from scratch

      line.replace(/\t/g, "");
      const asArray = Array.from(line);
      console.log(asArray);
      let chunks: Chunk[] = [];
      let cursorPos = 0;
      let count = 0;
      let closing: number = 0,
        opening: number = 0;
      const findStrings = () => {
        for (const index in asArray) {
          const i = Number(index);
          const ch = asArray[i];
          if (ch === '"') {
            count++;
            if (count % 2 === 0) {
              closing = i;
              chunks.push({ isStr: true, c: line.slice(opening, i + 1) });
            } else {
              opening = i;
              chunks.push({
                isStr: false,
                c: line.slice(chunks.length > 0 ? closing + 1 : 0, i),
              });
            }
            cursorPos = i;
          }
        }

        if (line.length - cursorPos > 0) {
          const tail = line.slice(
            cursorPos === 0
              ? cursorPos
              : closing === cursorPos
              ? cursorPos + 1
              : cursorPos,
            line.length
          );
          chunks.push({ isStr: tail[0] === '"', c: tail });
        }
      };

      findStrings();
      // remove leading white spaces
      //   chunks[0].c = chunks[0].c.replace(/\s/g, "");

      // const depthShift = checkDepth(chunks.filter((chunk) => !chunk.isStr));
      // if (i > 0) {
      //   const lineShift = depthShift === -1 ? depth - 1 : depth;
      //   if (lineShift > 0) {
      //     chunks.unshift({
      //       isStr: false,
      //       c: "\t".repeat(lineShift),
      //     });
      //   }
      // }
      // depth += depthShift;

      const asString = chunks.map((ch) => ch.c).join("");
      lenTotal += asString.length;
      formatted.push(asString);

      return (
        <span>
          {chunks.map((chunk, i) => {
            return (
              <span
                key={`chunk-${i}`}
                style={{ color: chunk.isStr ? "red" : "black" }}
              >
                {chunk.c}
              </span>
            );
          })}
        </span>
      );
    };
    const lines = code.split(/\n/g).map((line, i) => (
      <pre
        key={`code-line-${i}`}
        style={{
          padding: 0,
          margin: 0,
          fontSize: "1em",
          fontFamily: "arial",
        }}
      >
        {line ? getLine(i, line) : " "}
      </pre>
    ));
    // if (lenTotal !== code.len) {
    //   console.log(lenTotal, code);
    //   //   // only update state if new tabs were added
    //   // setCode({
    //   //   ...code,
    //   //   lines: formatted,
    //   //   raw: formatted.join(""),
    //   //   len: formatted.join("").length,
    //   // });
    //   //   const fromCursor = formatted.join("\n").slice(cursor.position);
    //   //   console.log(depth, fromCursor);
    //   //   if (depth < 0) depth = 0;
    //   //   setCursor({ position: cursor.position + depth, update: true });
    // }
    return lines;
  };

  return (
    <div
      style={{
        tabSize: 5,
        position: "relative",
        // border: "1px solid blue",
        lineHeight: "1em",
      }}
    >
      <FlexBox style={{ lineHeight: "2em" }}>
        <div>
          {code.split(/\n/g).map((line, i) => (
            <div
              key={`code-line-number-${i}`}
              className="unselectable"
              style={{ width: 25 }}
            >
              {i}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: 0,
            margin: 0,
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            zIndex: 0,
            // lineHeight: "2em",
            // border: "1px solid green",
          }}
        >
          <textarea
            id="codeInput"
            ref={textArea}
            spellCheck="false"
            key="code-textarea"
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            wrap="soft"
            onClick={handleClick}
            value={code}
            style={{
              position: "absolute",
              zIndex: 1,
              top: 0,
              left: 0,
              bottom: 0,
              //   marginLeft: 25,
              padding: 0,
              backgroundColor: "transparent",
            }}
          />
          {makeLines()}
        </div>
      </FlexBox>
    </div>
  );
};

export default Json;
