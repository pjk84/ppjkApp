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
  red: "#e66e66",

  lightGray: "#8f9599",
  orange: "#d65900",
};

export enum Themes {
  light = "light",
  dark = "dark",
}

export const color = {
  darkTheme: {
    darkGray: "#282222",
    darkGray2: "#332d2d",
    darkGray3: "#2d2727",
    mediumGray: "#4b4545",
    mediumGray2: "#776d6d",
    lightGray: "#aca3a3",
    lighterGray: "#cec4c4",
  },
  lightestGray: "#f0f0f0",
  lighterGray: "#e6e6e6",
  lighterGray2: "#d8d8d8",
  lightGray: "#a6a6a6",
  green: "#4ea75d",
  darkGreen: "#347940",
  lightGreen: "#cbf1d2",
  blue: "#2fb7e0",
  lightBlue: "#73d4f1",
  darkBlue: "#007498",
  darkerBlue: "#003b4d",
  darkestBlue: "#04232c",
  darkerGray: "black",
  charcoal: "#282222",
  gray: "#6d7275",
  darkGray: "#3b3e40",
  mediumGray: "#525558",
  red: "#ff5d52",
  lightRed: "#fe8b82",
  orange: "#ff6a00",
  white: "white",
  black: "black",
  offWhite: "#f9f9f9",
  transparent: "transparent",
};

export const appThemeLight = {
  ...color,

  color: color.mediumGray,
  table: {
    rowLight: color.lightestGray,
    rowDark: color.lighterGray,
    header: color.lighterGray2,
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
    active: {
      color: color.offWhite,
      borderColor: color.mediumGray,
      backgroundColor: color.mediumGray,
      boxShadow: null,
    },
    color: color.mediumGray,
    backgroundColor: color.white,
    borderColor: color.lightGray,
    hover: {
      color: color.darkerGray,
      borderColor: color.black,
    },
    boxShadow: `0px 1px 1px 2px ${color.lighterGray}`,
  },
  header: {
    boxShadow: `0px 1px 5px 2px ${color.lighterGray} `,
    backgroundColor: color.offWhite,
    borderColor: "transparent",
  },
  footer: {
    boxShadow: `0px 1px 5px 2px ${color.lighterGray} `,
    backgroundColor: color.offWhite,
  },
  main: {
    backgroundColor: color.lightestGray,
  },
  inner: {
    backgroundColor: color.lightestGray,
  },
  drops: {
    backgroundColor: null,
    color: color.darkGray,
    borderRadius: "10px",
    borderColor: color.lightGray,
  },
  ribbon: {
    color1: color.lightGreen,
    color2: color.green,
  },
  tag: {
    backgroundColor: color.lighterGray,
  },
  control: {
    active: {
      color: color.darkGray,
    },
    inactive: {
      color: color.lightGray,
    },
    hover: {
      color: {
        blue: color.lightBlue,
        red: color.lightGreen,
        default: color.darkGray,
      },
    },
    backgroundColor: color.lighterGray,
    boxShadow: color.lightGray,
  },
  navItem: {
    active: {
      color: color.darkGray,
      backgroundColor: color.lighterGray,
    },
    inactive: {
      color: color.lightGray,
    },
  },
  input: {
    placeholderColor: color.mediumGray,
    backgroundColor: color.offWhite,
  },
  speedType: {
    focus: {
      backgroundColor: color.lighterGray,
    },
  },
  sideBar: {
    backgroundColor: color.white,
    borderColor: color.lighterGray2,
    textColor: color.darkGray,
  },
  barChart: {
    backgroundColor: {
      active: color.mediumGray,
      inactive: color.green,
    },
    label: {
      text: color.darkGray,
    },
    lineColor: color.lighterGray2,
    textColor: color.darkGray,
    labelColor: color.darkGray,
  },
  toggle: {
    backgroundColor: color.lightGreen,
    color: {
      active: color.darkGray,
      inactive: color.lightGray,
      hover: color.darkGray,
    },
  },
};

export const appThemeDark = {
  ...color,

  color: color.darkTheme.lighterGray,
  table: {
    rowLight: color.darkTheme.darkGray,
    rowDark: color.darkTheme.darkGray3,
    header: color.darkTheme.darkGray2,
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
    active: {
      color: color.black,
      borderColor: color.offWhite,
      backgroundColor: color.offWhite,
      boxShadow: null,
    },
    color: color.lightGray,
    borderColor: color.darkTheme.mediumGray2,
    backgroundColor: color.darkTheme.darkGray,
    hover: {
      borderColor: color.offWhite,
      color: color.offWhite,
    },
    boxShadow: "none",
  },
  header: {
    boxShadow: "none",
    backgroundColor: color.charcoal,
    borderColor: color.mediumGray,
  },
  footer: {
    boxShadow: "none",
    backgroundColor: color.darkTheme.darkGray,
  },
  main: {
    backgroundColor: color.darkTheme.darkGray,
  },
  inner: {
    backgroundColor: color.darkTheme.darkGray,
  },
  drops: {
    backgroundColor: "transparent",
    color: color.green,
    borderRadius: "10px",
    borderColor: color.lightGray,
  },
  ribbon: {
    color1: color.green,
    color2: color.green,
  },
  tag: {
    backgroundColor: color.lighterGray,
  },
  control: {
    active: {
      color: color.offWhite,
    },
    inactive: {
      color: color.lightGray,
    },
    hover: {
      color: {
        blue: color.lightBlue,
        red: color.lightGreen,
        default: color.lightestGray,
      },
    },
    backgroundColor: color.lighterGray,
    boxShadow: color.lightGray,
    borderColor: color.lightGray,
  },
  navItem: {
    active: {
      color: color.darkTheme.lightGray,
      backgroundColor: color.darkGray,
    },
    inactive: {
      color: color.darkTheme.mediumGray2,
    },
  },
  input: {
    placeholderColor: color.lighterGray,
    backgroundColor: "transparent",
  },
  speedType: {
    focus: {
      backgroundColor: color.darkGray,
    },
  },
  sideBar: {
    backgroundColor: color.charcoal,
    textColor: color.lightGreen,
    borderColor: color.mediumGray,
    toggleBorder: color.mediumGray,
  },
  barChart: {
    backgroundColor: {
      active: color.lightGreen,
      inactive: color.green,
    },
    label: {
      text: color.offWhite,
    },
    lineColor: color.darkGray,
    textColor: color.lightestGray,
    labelColor: color.darkGray,
  },
  toggle: {
    backgroundColor: color.darkGray,
    color: {
      active: color.blue,
      inactive: color.mediumGray,
      hover: color.lighterGray,
    },
  },
};
