import styled from "styled-components";

export const InputBorderless = styled.input`
  border: none;
  width: fit-content;
  height: 1em;
  color: ${(p) => p.theme.color};
`;

export const StdInput = styled.input`
  -webkit-appearance: none;
  margin: 0;
  border: 1px solid;
  padding: 5px;
  width: fit-content;
  color: ${(p) => p.theme.color};
  background-color: ${(p) => p.theme.input.backgroundColor};
  border-color: ${(p) => p.theme.input.borderColor};
`;
