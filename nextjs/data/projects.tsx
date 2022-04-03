import { Project } from "../projects/types";
const projects: Array<Project> = [
  {
    id: "this_web_app",
    languages: "Javascript, Typescript, python",
    frameworks_and_tools: "Nextjs, Flask, Docker, Postgres, Sqlalchemy",
    repo: "https://github.com/pjk84/ppjksandbox/tree/master/speedtype",
    description: "personal sandbox and project showcase",
  },
  {
    id: "speed_type",
    language: "Javascript",
    framework: "React",
    repo: "https://github.com/pjk84/ppjksandbox/tree/master/speedtype",
    description:
      "speed type game. Type as many words as you can in 1 minute. Shows wordcount and accuracy when done.",
    demo: true,
  },
  {
    id: "word_hunt",
    language: "Javascript",
    framework: "React",
    repo: "https://github.com/pjk84/ppjksandbox/tree/master/speedtype",
    description:
      "speed type game. kill words by typing them correcly before they reach the right hand edge of the board.",
    demo: true,
  },
  {
    id: "pong",
    language: "Python",
    libraries: "ncurses",
    repo: "https://github.com/pjk84/python_games/blob/master/pong.py",
    description: "pong for the command line",
  },
  {
    id: "snake",
    language: "Python",
    libraries: "ncurses",
    repo: "https://github.com/pjk84/python_games/blob/master/snake.py",
    description: "Snake for the command line",
  },
  {
    id: "tetris",
    language: "c++11",
    repo: "https://github.com/pjk84/cpp_tetris",
    libraries: ["ncurses"],
    description: "command line Tetris using ncurses",
  },
];

export default projects;
