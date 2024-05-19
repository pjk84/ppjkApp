import React from "react";
import Link from "next/link";
import { RootState } from "../state";
import { useSelector } from "react-redux";
import { NavItem } from "../styles/buttons";
import { FlexBox } from "../styles/containers";
const NavBar = () => {
  const focus = useSelector((state: RootState) => state.main.focus);
  const loggedIn = useSelector((state: RootState) => state.main.auth.loggedIn);
  const pages = ["about", "projects"];
  if (loggedIn) {
    [...pages, "settings"];
  }

  return (
    <FlexBox gapSize={10} wrap={"true"} justify="center" align="center">
      {pages.map((p) => {
        const active = p === focus;
        return active ? (
          <NavItem key={`page-button-${p}`} active={active}>
            {p}
          </NavItem>
        ) : (
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            key={`page-link-${p}`}
            href={`/${p}`}
            passHref
          >
            <NavItem active={active}>{p}</NavItem>
          </Link>
        );
      })}
    </FlexBox>
  );
};

export default NavBar;
