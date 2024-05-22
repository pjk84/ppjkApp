import styled from "styled-components";
import { color } from ".";
import { text } from "stream/consumers";

interface TableCellProps {
  index: number;
  animation?: "jitter" | "flash";
  color?: string;
}

export const TableCell = styled.td.attrs<TableCellProps>((props) => ({
  style: {
    animation:
      props.animation === "jitter"
        ? `0.${Math.random() + 7}s jitterIn ease-out`
        : props.animation == "flash"
        ? `0.5s flash ease-out`
        : null,
    color:
      props.color == "red"
        ? props.theme.red
        : props.color == "green"
        ? props.theme.green
        : props.color == "blue"
        ? props.theme.blue
        : null,
    backgroundColor:
      props.index % 2 === 0
        ? props.theme.table.rowLight
        : props.theme.table.rowDark,
  },
}))<TableCellProps>`
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
