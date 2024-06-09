import styled from "styled-components";

export const Header1 = styled.header`
  position: relative;
  padding: 0px 5px 0px 5px;
  color: ${(p) => p.theme.textColor};
  background-color: transparent;
  font-size: 25px;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
`;

export const Header2 = styled.header<{ withBackground: boolean }>`
  margin: 0;
  padding: 0;

  background-color: ${(p) =>
    p.withBackground ? p.theme.mediumGray : "transparent"};
  font-size: 40px;
  border: none;
  display: flex;
  font-weight: normal;

  /* justify-content: center; */
`;
