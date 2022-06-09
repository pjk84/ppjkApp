import React from "react";
import Link from "next/link";
import { RootState } from "../state";
import { useSelector } from "react-redux";
import { Btn4 } from "../styles/buttons";
import { FlexBox } from "../styles/containers";
const navBar = () => {
  const focus = useSelector((state: RootState) => state.main.focus);
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);
  const pages = ["about", "projects", "blog", loggedIn && "settings"];

  return (
    <FlexBox wrap={"true"}>
      {pages.map((p) => {
        return (
          <span key={`page-button-${p}`}>
            {p === focus ? (
              <Btn4 active>{p}</Btn4>
            ) : (
              <Link href={`/${p}`}>
                <Btn4>{p}</Btn4>
              </Link>
            )}
          </span>
        );
      })}
    </FlexBox>
  );
};

export default navBar;
