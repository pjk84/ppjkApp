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

export const Header2 = styled.header`
  background-color: transparent;
  font-size: 40px;
  border: none;
  display: flex;
  justify-content: center;
  color: ${(p) => p.theme.lightGray};
`;

export const BlogMessageTitle = styled.header<{ clickable?: boolean }>`
  color: ${(props) => props.theme.posts.titleColor};
  width: max-content;
  font-size: 40px;
  &: hover {
    text-decoration: ${(p) => p.clickable && "underline"};
    cursor: ${(p) => p.clickable && "pointer"};
  }
`;
