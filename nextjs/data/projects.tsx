import { Project } from "../projects/types";
const projects: Array<Project> = [
  {
    id: "ppjk84",
    languages: ["Javascript", "Typescript", "python", "csharp"],
    category: "web app",
    frameworks_and_tools:
      "Nextjs, Flask, Docker, Postgres, Sqlalchemy, .NET core 6, entity framework",
    code: "https://github.com/pjk84/ppjksandbox/tree/master/speedtype",
    description: "personal sandbox and project showcase",
  },
  {
    id: "speed_type",
    languages: ["Typescript"],
    category: "game",
    framework: "React",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/speed_type.tsx",
    description:
      "speed type game. Type as many words as you can in 1 minute. Shows wordcount and accuracy when done.",
    demo: true,
  },
  {
    id: "word_hunt",
    languages: ["Typescript"],
    category: "game",
    framework: "React",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/word_hunt.tsx",
    description:
      "speed type game. kill words by typing them correcly before they reach the right hand edge of the board.",
    demo: true,
  },
  {
    id: "wordle",
    languages: ["Typescript"],
    category: "game",
    framework: "React",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/wordle.tsx",
    description: "wordle clone",
    demo: true,
  },
  {
    id: "mouse_slinger",
    languages: ["Typescript"],
    category: "game",
    framework: "React",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/wordle.tsx",
    description: "wordle clone",
    demo: true,
  },
  {
    id: "pong",
    languages: ["Python"],
    category: "game",
    libraries: "ncurses",
    code: "https://github.com/pjk84/python_games/blob/master/pong.py",
    description: "pong for the command line",
  },
  {
    id: "snake",
    languages: ["Python"],
    category: "game",
    libraries: "ncurses",
    code: "https://github.com/pjk84/python_games/blob/master/snake.py",
    description: "Snake for the command line",
  },
  {
    id: "tetris",
    languages: ["cplusplus"],
    category: "game",
    code: "https://github.com/pjk84/cpp_tetris",
    libraries: ["ncurses"],
    description: "command line Tetris using ncurses",
  },
];

export default projects;
