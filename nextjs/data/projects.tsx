import { Project } from "../projects/types";
const projects: Array<Project> = [
  {
    id: "this_site",
    languages: ["Typescript", "csharp"],
    category: "web app",
    frameworks_and_tools: ["nextjs", "docker", "nginx", "redis"],
    database: ["mongodb"],
    hosting: ["digitalocean"],
    code: "https://github.com/pjk84/ppjksandbox/tree/master/speedtype",
    description: "personal sandbox and project showcase",
  },
  {
    id: "speed_type",
    languages: ["Typescript"],
    category: "game",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/speed_type.tsx",
    description:
      "speed type game. Type as many words as you can in 1 minute. Shows wordcount and accuracy when done.",
    demo: true,
  },
  {
    id: "word_hunt",
    languages: ["Typescript"],
    category: "game",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/word_hunt.tsx",
    description:
      "speed type game. kill words by typing them correcly before they reach the right hand edge of the board.",
    demo: true,
  },
  {
    id: "wordle",
    languages: ["Typescript"],
    category: "game",
    code: "https://github.com/pjk84/ppjkApp/blob/master/nextjs/pages/wordle.tsx",
    description: "wordle clone",
    demo: true,
  },
  {
    id: "mouse_slinger",
    languages: ["Typescript"],
    category: "game",
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
  {
    id: "weather_api",
    languages: ["csharp", "typescript"],
    category: "weather",
    code: "https://github.com/pjk84/cpp_tetris",
    libraries: ["ipApi"],
    description: "get weather data based on your ip",
    demo: true,
  },
];

export default projects;
