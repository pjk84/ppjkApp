import styled from "styled-components";

export const TableCell = styled.td.attrs<{
  index: number;
  animation?: "jitter" | "slide";
}>((props) => ({
  style: {
    animation:
      props.animation === "jitter"
        ? `0.${Math.random() + 7}s jitterIn ease-out`
        : null,
    backgroundColor:
      props.index % 2 === 0
        ? props.theme.table.rowLight
        : props.theme.table.rowDark,
  },
}))`
  position: relative;
  padding: 10px;
  color: ${(p) => p.theme.color};
`;

export const TableHeader = styled.th<{}>`
  position: relative;
  background-color: ${(p) => p.theme.table.header};
  padding: 10px;
  font-size: 20px;
  color: ${(p) => p.theme.color};
`;

export const Table = styled.table`
  /* box-shadow: ${(p) => p.theme.boxShadow}; */
`;
