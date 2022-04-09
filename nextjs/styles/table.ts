import styled from "styled-components";

export const TableCell = styled.td<{ width: string; index: number }>`
  background-color: ${(p) =>
    p.index % 2 === 0 ? p.theme.table.rowLight : p.theme.table.rowDark};
  padding: 10px;
  color: ${(p) => p.theme.textColor};
`;

export const Table = styled.table`
  /* box-shadow: ${(p) => p.theme.boxShadow}; */
`;
