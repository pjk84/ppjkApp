import styled, { StyledComponent } from "styled-components";
import { Style } from "util";
import { appTheme, color } from ".";
import device, { size } from "./devices";

export const Wrapper = styled.div`
  /* display: "grid";
  gap: 20;
  gridtemplateareas: "header" "body" "footer"; */
  position: absolute;
  height: max-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  color: ${(p) => p.theme.green};
`;

export const Drop = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: ${(p) => p.theme.drops.borderRadius};
  opacity: 0;
  position: absolute;
  top: 0;
`;

export const Header = styled.header<{}>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 25px;
  flex-wrap: wrap;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: ${(props) => props.theme.header.boxShadow};
  gap: 20px;
  &:after {
    animation: 1s stretch ease-out forwards, 0.1s fadeIn ease-out;
    content: "";
    bottom: 0;
    position: absolute;
    height: 1px;
    background-color: ${(props) => props.theme.dividerColor};
  }
  &:before {
    content: "";
    position: absolute;
    height: 5px;
    top: 0px;
    width: 100%;
    background-image: ${(p) =>
      `linear-gradient(to right, ${p.theme.ribbon.color1}, ${p.theme.ribbon.color2}, ${p.theme.ribbon.color1})`};
  }
`;

export const Footer = styled.footer`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.mediumGray};
  min-height: 50px;
  width: 100%;
  &:before {
    animation: 1s stretch ease-out forwards, 0.1s fadeIn ease-out;
    content: "";
    top: 0;
    position: absolute;
    height: 1px;
    background-color: ${(props) => props.theme.dividerColor};
  }
`;
1;

export const Main = styled.main<{}>`
  position: relative;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  background-color: ${(p) => p.theme.backgroundColor2};
`;

export const Inner = styled.div<{}>`
  width: 95%;
  padding: 5px;

  @media only screen and ${device.tablet} {
    width: ${size.tablet};
    padding: 20px;
  }
  display: flex;
  background-color: ${(p) => p.theme.backgroundColor2};
  flex-direction: column;
  overflow: hidden;
`;

export const TextEdit = styled.span`
  width: 100%;
  /* display: flex; */
  position: relative;
  flex-direction: column;
  /* align-items: center; */
  color: ${(p) => p.theme.textColor};
  border-radius: 4px;
`;

export const ButtonBox = styled.div<{ column?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 80%;
  margin-top: 30px;
  flex-direction: ${(props) => props.column && "column"};
`;

export const TitleBar = styled.input<{ newMessage?: boolean }>`
  background: transparent;
  border: transparent;
  /* font-size: 30px; */
  color: ${(props) => props.theme.textColor};
`;

export const FlexBoxCentered = styled.div<{
  fullWidth?: boolean;
  gap?: number;
}>`
  width: ${(p) => (p.fullWidth ? "100%" : null)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${(p) => p.gap && `${p.gap}px`};
`;

export const FlexBox = styled.div<{
  align?: "center";
  gapSize?: "small" | "medium" | "large" | number;
  column?: boolean;
  wrap?: "true";
  color?: "green" | "blue" | "gray";
  justify?: "center" | "end" | "between";
}>`
  position: relative;
  color: ${(p) =>
    p.color === "gray"
      ? appTheme.gray
      : p.color === "blue"
      ? appTheme.blue
      : p.theme.textColor};
  display: Flex;
  gap: ${(props) =>
    props.gapSize === "small"
      ? "10px"
      : props.gapSize === "medium"
      ? "15px"
      : props.gapSize === "large"
      ? "20px"
      : `${props.gapSize || 0}px`};
  align-items: ${(props) =>
    props.align === "center"
      ? "center"
      : props.align === "start"
      ? "start"
      : null};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: ${(props) => props.wrap && "wrap"};
  justify-content: ${(props) =>
    props.justify === "center"
      ? "center"
      : props.justify === "end"
      ? "flex-end"
      : props.justify === "between"
      ? "space-between"
      : "start"};
`;

export const Box1 = styled.div<{
  border?: boolean;
  gapSize?: "small" | "large";
  opened?: boolean;
}>`
  position: relative;
  display: Flex;
  gap: 10px;
  gap: ${(props) =>
    props.gapSize === "small"
      ? "10px"
      : props.gapSize === "large"
      ? "20px"
      : null};
  font-size: ${(props) => props.theme.fontSize};
  border-radius: 4px;

  border: ${(props) => props.border && "1px solid"};
  border-color: ${(props) => props.theme.green};
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and ${device.tablet} {
    width: ${size.tablet};
  }
  transition: height 2s;
  margin-bottom: ${(props) => props.opened && "25px"};
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

export const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PostListItem = styled.li`
  transition: all 0.5s;
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid;
  border-color: transparent;
  &:hover {
    border-color: ${(p) => p.theme.lightGray};
  }
`;
