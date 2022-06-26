import styled from "styled-components";

export const Header1 = styled.header`
  position: relative;
  color: ${(p) => p.theme.textColor};
  background-color: transparent;
  font-size: 25px;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Header2 = styled.h1`
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-size: 40px;
  border: none;
  display: flex;
  font-weight: normal;
  /* justify-content: center; */
`;
