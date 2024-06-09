import styled from "styled-components";

export const StdButton = styled.button<{
  active?: boolean;
  size?: "tiny" | "small" | "medium" | "large";
  animation?: string;
  shadow?: boolean;
}>`
  position: relative;
  border-radius: 4px;
  height: max-content;
  width: max-content;
  box-shadow: ${(p) => p.theme.button.boxShadow};
  font-size: ${(p) =>
    p.size === "tiny"
      ? "10px"
      : p.size === "small"
      ? "15px"
      : p.size === "medium"
      ? "20px"
      : "30px"};
  border: 1px solid;
  border-color: ${(p) =>
    p.active ? p.theme.button.active.borderColor : p.theme.button.borderColor};
  padding: ${(p) =>
    p.size === "tiny"
      ? "5px 5px 5px 5px"
      : p.size === "small"
      ? "5px 10px 5px 10px"
      : "10px 20px 10px 20px"};
  color: ${(p) =>
    p.active ? p.theme.button.active.color : p.theme.button.color};
  background-color: ${(p) =>
    p.active
      ? p.theme.button.active.backgroundColor
      : p.theme.button.backgroundColor};
  cursor: pointer;
  transition: all 0.1s ease-out;
  animation: ${(p) => p.animation === "slideUp" && "0.2s slideUp ease-in"};
  &:hover {
    border: ${(p) =>
      !p.active && `1px solid ${p.theme.button.hover.borderColor}`};
    color: ${(p) => !p.active && p.theme.button.hover.color};
  }
  &:before {
    animation: ${(props) =>
      props.animation === "sweep" && "0.5s sweep ease-out"};
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const ButtonBorderless = styled.button<{
  color: "blue" | "green";
}>`
  position: relative;
  border-radius: 4px;
  height: max-content;
  width: max-content;
  font-size: 15px;
  opacity: 0.75;
  border: 0px;
  border-color: ${(p) => (p.color == "blue" ? p.theme.blue : p.theme.green)};
  padding: 0px;
  color: ${(p) => (p.color == "blue" ? p.theme.blue : p.theme.green)};
  background-color: transparent;
  cursor: pointer;
  transition: all 0.1s ease-out;
  &:hover {
    opacity: 1;
  }
`;

export const ProjectLaunchButton = styled.button<{ wasClicked: boolean }>`
  position: relative;
  border-radius: 4px;
  height: max-content;
  font-size: 20px;
  width: max-content;
  box-shadow: ${(p) => p.theme.button.boxShadow};
  border: 1px solid;
  border-color: ${(p) => p.theme.button.borderColor};
  padding: 15px 20px 15px 20px;
  color: ${(p) => p.theme.button.color};
  background-color: ${(p) => p.theme.button.backgroundColor};
  cursor: pointer;
  transition: all 0.1s ease-out;
  animation: ${(p) => "0.2s slideUp ease-in"};
  &:hover {
    border-color: ${(p) => p.theme.button.hover.borderColor};
  }
  &:before {
    animation: ${(p) => (p.wasClicked ? "0.5s sweep ease-out" : null)};
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Control = styled.button<{
  active?: boolean;
  color?: "red" | "blue" | "gray";
  border?: boolean;
  fontSize?: number;
}>`
  padding: ${(p) => (p.border ? "5px" : "0px")};
  background-color: transparent;
  text-align: left;
  transition: all 0.1s;
  border: 0px;
  width: max-content;
  font-size: ${(p) => (p.fontSize ? `${p.fontSize}px` : "15px")};
  border-color: ${(p) =>
    p.border ? p.theme.control.borderColor : "transparent"};
  color: ${(p) =>
    p.color
      ? p.theme[p.color]
      : p.active
      ? p.theme.control.active.color
      : p.theme.control.inactive.color};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${(p) =>
      p.color == "blue"
        ? p.theme.control.hover.color.blue
        : p.color == "red"
        ? p.theme.control.hover.color.red
        : p.theme.control.hover.color.default};
  }
`;

export const Toggle = styled.button<{
  active?: boolean;
  color?: "red" | "blue" | "gray";
  border?: boolean;
  fontSize?: number;
}>`
  padding: 5px;
  background-color: ${(p) =>
    p.active ? p.theme.toggle.backgroundColor : "transparent"};
  text-align: left;
  transition: all 0.1s;
  border: 0px;
  border-radius: 4px;
  width: max-content;
  font-size: 15px;
  color: ${(p) =>
    p.active ? p.theme.toggle.color.active : p.theme.toggle.color.inactive};
  cursor: pointer;
  &:hover {
    color: ${(p) =>
      p.active ? p.theme.toggle.color.active : p.theme.toggle.color.hover};
  }
`;

export const SidebarSwitch = styled.button`
  position: absolute;
  right: -29px;
  top: 20px;
  border: none;
  width: 30px;
  height: 35px;
  cursor: pointer;
  background-color: ${(p) => p.theme.sideBar.backgroundColor};
  color: ${(p) => p.theme.sideBar.textColor};
  border: 1px solid;
  border-left: transparent;
  border-color: ${(p) => p.theme.sideBar.borderColor};
  border-radius: 2px;
  z-index: 10;
`;

export const NavItem = styled.div<{
  active?: boolean;
}>`
  position: relative;
  color: ${(p) =>
    p.active ? p.theme.navItem.active.color : p.theme.navItem.inactive.color};
  background-color: ${(p) =>
    p.active ? p.theme.navItem.active.backgroundColor : null};
  font-size: 20px;
  border-radius: 8px;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
  transition: all 0.25s;
  text-decoration: none;
  &:hover {
    color: ${(p) => p.theme.navItem.active.color};
  }
`;

export const HyperLink = styled.a`
  color: ${(p) => p.theme.color};
`;

export const MenuDot = styled.span`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.darkGray};
`;

const StyledLink = styled.li`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
