import styled from "styled-components";
import { appTheme } from ".";
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
  background-color: ${(p) => p.theme.drops.backgroundColor};
  border-radius: ${(p) => p.theme.drops.borderRadius};
  color: ${(p) => p.theme.drops.color};
  opacity: 0;
  position: absolute;
  top: 0;
`;

export const Header = styled.header<{}>`
  display: flex;
  position: relative;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${(p) => p.theme.header.backgroundColor};
  border-bottom: 1px solid;
  border-color: ${(p) => p.theme.header.borderColor};
  box-shadow: ${(p) => p.theme.header.boxShadow};
  z-index: 1;
  &:after {
    animation: 1s stretch ease-out forwards, 0.1s fadeIn ease-out;
    content: "";
    bottom: 0;
    position: absolute;
    height: 1px;
    background-color: ${(props) => props.theme.dividerColor};
  }
`;

export const Ribbon = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  height: 30px;
  /* padding: 2px; */
  padding-left: 10px;
  width: 100%;
  background-color: ${(p) => p.theme.ribbon.color1};
  /* @media only screen and ${device.tablet} {
    height: max-content;
  } */
`;

export const Backdrop = styled.div`
  position: absolute;
  background-color: ${(p) => p.theme.sideBar.backgroundColor};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const SideBar = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  padding: ${(p) => (p.active ? "10px" : null)};
  padding-top: 25px;
  flex-direction: column;
  white-space: nowrap;
  height: 100%;
  background-color: ${(p) => p.theme.sideBar.backgroundColor};
  border-right: ${(p) => (p.active ? "1px solid" : null)};
  border-color: ${(p) => p.theme.sideBar.borderColor};
  color: ${(p) => p.theme.color};
  /* -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in; */
  opacity: ${(p) => (p.active ? 1 : 1)};
  overflow: hidden;
`;

export const Footer = styled.footer`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.color};
  background-color: ${(p) => p.theme.footer.backgroundColor};
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
  background-color: ${(p) => p.theme.main.backgroundColor};
`;

export const PageWrapper = styled.div<{ maxWidth?: number; center?: boolean }>`
  position: relative;
  display: flex;
  gap: 50px;
  width: 95%;
  padding: 5px;
  padding-bottom: 25px;
  color: ${(p) => p.theme.color};
  padding-top: 25px;
  justify-content: ${(props) => (props.center ? "center" : null)};

  @media only screen and ${device.tablet} {
    max-width: ${(props) => `${props.maxWidth ?? 800}px`};
    padding: 20px;
    padding-top: 50px;
  }
  background-color: ${(p) => p.theme.inner.backgroundColor};
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
  color: ${(p) => p.theme.color};
  display: flex;
  align-items: center;

  justify-content: center;
  flex-direction: column;
  gap: ${(p) => p.gap && `${p.gap}px`};
`;

export const FlexBox = styled.div<{
  align?: "center" | "start" | "end";
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
      : p.theme.color};
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
      : props.align === "end"
      ? "end"
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

export const Component = styled.div<{ maxHeight?: number; column?: boolean }>`
  position: relative;
  display: flex;
  border: 1px solid;
  border-top: none;
  flex-wrap: wrap;
  align-items: start;
  border-color: ${(props) => props.theme.container.border.color};
  padding: 10px;
  border-radius: 4px;
  gap: 25px;
  padding-top: 20px;
  max-height: ${(props) => (props.maxHeight ? `${props.maxHeight}px` : null)};
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: ${(props) => (props.column ? "column" : null)};
`;

export const ComponentHeader = styled.div<{ inner?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid;
  z-index: 1;
  gap: 10px;
  border-bottom: none;
  transform: translateY(2px);
  border-color: ${(p) => p.theme.container.border.color};
  height: ${(p) => (p.inner ? "15px" : "25px")};
  font-size: ${(p) => (p.inner ? "15px" : "25px")};
  padding: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /* bottom: 0; */
  background-color: ${(p) =>
    p.inner ? "transparent" : p.theme.component.header.backgroundColor};
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

export const StdList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const StdListItem = styled.li`
  transition: all 0.5s;
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid;
  border-color: transparent;
`;
