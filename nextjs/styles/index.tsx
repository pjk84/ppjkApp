import { cp } from "fs/promises";
import { getEnvironmentData } from "worker_threads";

export const appTheme = {
  green: "#57b967",
  lightGreen: "#cbf1d2",
  blue: "#2fb7e0",
  darkGray: "#1d1e1f",
  darkerGray: "#131314",
  gray: "#6d7275",
  mediumGray: "#3b3e40",
  red: "#ff5d52",
  lightGray: "#8f9599",
  orange: "#d65900",
};

export enum Themes {
  light = "light",
  dark = "dark",
}

export const color = {
  lightestGray: "#f0f0f0",
  lighterGray: "#dcdcdc",
  lightGray: "#a6a6a6",
  green: "#57b967",
  lightGreen: "#cbf1d2",
  blue: "#2fb7e0",
  darkBlue: "#007498",
  darkerGray: "black",
  gray: "#6d7275",
  darkGray: "#3b3e40",
  mediumGray: "#525558",
  red: "#ff5d52",
  orange: "#ff6a00",
  white: "white",
  offWhite: "#f9f9f9",
  transparent: "transparent",
};

export const appThemeLight = {
  ...color,

  nav: {
    navItem: {
      backgroundColor: color.lightestGray,
      borderColor: color.lighterGray,
    },
  },

  boxShadow: "0px 1px 5px 1px #aeb3b6",
  dividerColor: color.lighterGray,
  textColor: color.mediumGray,
  textColorInactive: color.lightGray,
  backgroundColor2: color.lightestGray,
  backgroundColor: color.offWhite,
  borderColor: color.lighterGray,
  buttonBorder: color.transparent,
  buttonActiveBorder: color.lightGray,
  buttonActiveBackgroundColor: color.lightestGray,
  table: {
    rowLight: color.lightestGray,
    rowDark: color.lighterGray,
  },
  posts: {
    titleColor: color.darkGray,
    boxShadow: `0px 2px 5px 1px ${color.lightestGray}`,
    threadColor: color.lighterGray,
    borderColor: color.lighterGray,
    backgroundColor: color.white,
    header: {
      backgroundColor: color.offWhite,
    },
  },
  button: {
    textColorHover: color.mediumGray,
    textColorActive: color.lightestGray,
    backgroundColorActive: color.mediumGray,
    backgroundColor: color.white,
    boxShadowActive: null,
    textColorInactive: color.lightGray,
    borderColor: color.lighterGray,
    borderColorActive: color.mediumGray,
    borderColorHover: color.lightGray,
    boxShadow: `0px 1px 1px 0px ${color.lighterGray}`,
  },
  header: {
    boxShadow: `0px 1px 5px 2px ${color.lighterGray} `,
  },
  drops: {
    backgroundColor: color.lighterGray,
    color: color.darkGray,
    borderRadius: "10px",
    borderColor: color.lightGray,
  },
  ribbon: {
    color1: color.lightestGray,
    color2: color.green,
  },
  tag: {
    backgroundColor: color.lighterGray,
  },
  control: {
    backgroundColor: color.lighterGray,
    boxShadow: color.lightGray,
    hover: color.darkGray,
    active: color.darkGray,
    inactive: color.lightGray,
  },
  input: {
    placeholderColor: color.lighterGray,
  },
};

export const appThemeDark = {
  dropColor: color.green,
  buttonBorder: color.lightGray,
  buttonActiveBorder: color.white,
  dividerColor: "#8f9599",
  messageBorder: '1px solid "#3b3e40"',
  textColor: "#57b967",
  textColorActive: "white",
  backgroundColor: "black",
  borderColor: "#8f9599",
  green: "#57b967",
  lightGreen: "#cbf1d2",
  blue: "#2fb7e0",
  darkGray: "black",
  darkerGray: "black",
  gray: "#6d7275",
  mediumGray: "#3b3e40",
  red: "#ff5d52",
  lightGray: "#8f9599",
  orange: "#ff6a00",
  boxShadow: null,
  post: {
    titleColor: color.green,
  },
};
