import styled from "styled-components";

export const InputBorderless = styled.input`
  border: none;
  width: fit-content;
  height: 1em;
  color: ${(p) => p.theme.textColor};
`;

export const StdInput = styled.input`
  border: none;
  width: fit-content;
  color: ${(p) => p.theme.textColor};
`;
