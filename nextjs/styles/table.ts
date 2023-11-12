import styled from "styled-components";

export const TableCell = styled.td<{
  index: number;
  animation?: "jitter" | "slide";
}>`
  position: relative;
  background-color: ${(p) =>
    p.index % 2 === 0 ? p.theme.table.rowLight : p.theme.table.rowDark};
  padding: 10px;
  color: ${(p) => p.theme.color};
  animation: ${(p) =>
    p.animation === "jitter"
      ? `0.${Math.random() + 7}s jitterIn ease-out`
      : p.animation === "slide"
      ? `${1 / p.index}s slideRight ease-out`
      : null};
`;

export const TableHeader = styled.td<{}>`
  position: relative;
  background-color: ${(p) => p.theme.table.header};
  padding: 10px;
  color: ${(p) => p.theme.color};
`;

export const Table = styled.table`
  /* box-shadow: ${(p) => p.theme.boxShadow}; */
`;
