import React from "react";
import Link from "next/link";
import { RootState } from "../state";
import { useSelector } from "react-redux";
import { Btn4 } from "../styles/buttons";
const navBar = () => {
  const focus = useSelector((state: RootState) => state.main.focus);
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);
  const pages = ["about", "blog", "projects", loggedIn && "settings"];

  return (
    <ul style={{ listStyleType: "none" }}>
      <li>
        {pages.map((p) => (
          <Link href={`/${p}`}>
            <Btn4 active={focus === p}>{p}</Btn4>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default navBar;
