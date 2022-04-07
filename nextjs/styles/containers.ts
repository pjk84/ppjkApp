import styled from "styled-components";
import { appTheme } from ".";
import device, { size } from "./devices";

export const Wrapper = styled.div`
  /* display: "grid";
  gap: 20;
  gridtemplateareas: "header" "body" "footer"; */
  display: flex;
  flex-direction: column;
  gap: 50px;
  color: ${(p) => p.theme.green};
`;

export const Top = styled.div<{}>`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  gap: 50px;
  &:after {
    animation: 1s stretch ease-out forwards, 0.1s fadeIn ease-out;
    content: "";
    bottom: 0;
    position: absolute;
    height: 1px;
    background-color: ${(props) => props.theme.mediumGray};
  }
`;

export const Footer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.mediumGray};
  min-height: 50px;
  margin-top: 25px;
  width: 100%;
  &:before {
    animation: 1s stretch ease-out forwards, 0.1s fadeIn ease-out;
    content: "";
    top: 0;
    position: absolute;
    height: 1px;
    background-color: ${(props) => props.theme.mediumGray};
  }
`;
1;

export const Main = styled.div<{}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Inner = styled.div<{}>`
  width: 95%;
  height: 100%;
  /* padding: 50px; */
  @media only screen and ${device.tablet} {
    width: ${size.tablet};
  }
  display: flex;
  flex-direction: column;
`;

export const MessageBodyPreview = styled.div`
  padding: 0;
  max-height: 5em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const ThreadWrapper = styled.div<{ depth?: number }>`
  display: flex;
  flex-direction: column;
  margin-left: ${(p) => `${p.depth}px`};
  border-left: 1px solid ${appTheme.mediumGray};
  &:before {
    opacity: ${(p) => (p.depth && p.depth > 0 ? 1 : 0)};
    content: "";
    position: absolute;
    height: 100%;
    width: 1px;
    left: -25px;
    top: 0;
    bottom: 0;
    background-color: ${appTheme.mediumGray};
  }
`;

export const MessageWrapper = styled.div<{
  type?: "new" | "editing" | "deleting" | "thread";
}>`
  position: relative;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  gap: 20px;
  border: ${(p) => p.type !== "thread" && "1px solid"};

  border-color: ${(props) =>
    props.type === "editing"
      ? props.theme.blue
      : props.type === "deleting"
      ? props.theme.red
      : props.theme.mediumGray};
  padding: 20px;
  word-wrap: break-word;
  border-radius: 4px;
  &:hover {
    .controls {
      opacity: 1;
    }
  }
`;

export const TextEdit = styled.div<{}>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
`;
export const Outer = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.backgroundColor};
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const StdInput = styled.input`
  background: white;
  border: transparent;
  color: ${(props) => props.theme.darkGray};
`;

export const ButtonBox = styled.div<{ column?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
  flex-direction: ${(props) => props.column && "column"};
`;

export const TitleBar = styled.input<{ newMessage?: boolean }>`
  background: transparent;
  border: transparent;
  font-size: 30px;
  color: ${(props) => props.theme.lightGray};
  opacity: ${(props) => (props.newMessage ? 0.4 : 1)};
`;

export const FlexBoxCentered = styled.div<{ fullWidth?: boolean }>`
  width: ${(p) => (p.fullWidth ? "100%" : null)};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FlexBox = styled.div<{
  align?: "center";
  gapSize?: "small" | "medium" | "large";
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
      : appTheme.green};
  display: Flex;
  gap: ${(props) =>
    props.gapSize === "small"
      ? "10px"
      : props.gapSize === "medium"
      ? "15px"
      : props.gapSize === "large"
      ? "20px"
      : null};
  align-items: "${(props) => (props.align === "center" ? "center" : "start")}";
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
