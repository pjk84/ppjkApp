import React, { useState, useEffect } from "react";
import { Btn4 } from "../styles/buttons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actiontypes";
import { RootState } from "../state";

type ButtonProps = {
  title: string;
  page: string;
};
export const StdButton = ({ page, title }: ButtonProps) => {
  const focus = useSelector((state: RootState) => state.main.focus);
  const router = useRouter();

  const handleClick = () => {
    if (focus !== page) router.push(`/${page}`);
  };

  return (
    <Btn4 active={focus === page} onClick={handleClick}>
      {title}
    </Btn4>
  );
};
