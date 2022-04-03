import styled from "styled-components";
import { appTheme } from ".";

export const Btn1 = styled.button<{
  color?: "blue" | "green";
  size?: "small" | "large" | "medium";
  slide?: "Left" | "Right";
  slideUp?: boolean;
  fadeIn?: boolean;
  sweep?: boolean;
  breathe?: boolean;
  slideDown?: boolean;
  active?: boolean;
}>`
  position: relative;
  background-color: transparent;
  width: max-content;
  border-radius: 4px;
  color: ${(p) =>
    p.active
      ? p.theme.lightGreen
      : p.color === "blue"
      ? p.theme.blue
      : p.theme.green};
  border-color: ${(props) =>
    props.color === "green"
      ? "#58e087"
      : props.color === "blue"
      ? "#2fb7e0"
      : props.theme.lightGreen};
  font-size: ${(props) =>
    props.size === "small" ? "12px" : props.size === "large" ? "30px" : "15px"};
  border: 1px solid;
  z-index: 9;
  padding: ${(props) =>
    props.size === "small" ? "5px 10px 5px 10px" : "10px 20px 10px 20px"};
  cursor: pointer;
  animation: ${(props) =>
    props.slide
      ? `0.5s slideIn${props.slide} ease-in`
      : props.slideUp
      ? "0.2s slideUp ease-in"
      : props.fadeIn
      ? "0.5s fadeIn ease-out"
      : props.slideDown
      ? "0.2s slideDown ease-out"
      : null};

  &:hover {
    animation: ${(props) => props.breathe && "1s breathe ease-out infinite"};
    /* color: #58e087; */
    /* &:before {
      height: 100%;
    } */
  }

  &:before {
    animation: ${(props) => props.sweep && "0.5s sweep ease-out"};
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Btn2 = styled.button<{
  active?: boolean;
  color?: string;
  isFirstRender?: boolean;
}>`
  position: relative;
  color: ${(props) => (props.active ? "white" : " #58e087")};
  background-color: transparent;
  width: ${(props) => (props.active ? "100%" : "max-content")};
  min-width: 150px;
  border-color: ${(props) => (props.color === "green" ? "#58e087" : "#d8e9eb")};
  font-size: 20px;
  border: none;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
  transition: color 0.5s;

  &:before {
    opacity: ${(props) => (props.active ? 0 : 1)};
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: 1px;
    animation: ${(props) => props.isFirstRender && "0.5s stretch ease-out"};
    background-color: #58e087;
  }
  &:after {
    animation: ${(props) =>
      (props.isFirstRender || props.active) &&
      "0.5s stretch ease-out, 0.5s fadeIn ease-out"};
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 1px;
    background-color: #58e087;
  }
  &:hover {
    animation: ${(props) => !props.active && "0.5s flash ease-in"};
    &:after {
      animation: ${(props) => !props.active && "0.5s slideRightFade ease-in"};
    }
    &:before {
      animation: ${(props) => !props.active && "0.5s slideLeftFade ease-in"};
    }
  }
`;

export const Btn3 = styled.button<{ color?: string }>`
  width: max-content;
  padding: 5;
  background-color: transparent;
  color: ${(props) => (props.color === "blue" ? props.theme.blue : "gray")};
  border: 1px solid;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.5s;
`;

export const Control = styled.div<{
  active?: boolean;
  color?: "red" | "blue" | "gray";
}>`
  color: ${(props) => (props.active ? props.theme.blue : props.theme.gray)};
  color: ${(props) =>
    props.color === "red"
      ? props.theme.red
      : props.color === "blue"
      ? props.theme.blue
      : props.theme.gray};
  transition: all 0.5s;
  /* background-color: transparent; */
  border: none;
  width: max-content;
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.color ? null : appTheme.lightGreen)};
  }
`;

export const Btn4 = styled.button<{
  active?: boolean;
  isFirstRender?: boolean;
}>`
  position: relative;
  color: ${(props) =>
    props.active ? props.theme.lightGreen : props.theme.green};
  background-color: transparent;
  /* min-width: 150px; */
  font-size: 20px;
  border: none;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
  transition: color 0.5s;
`;
