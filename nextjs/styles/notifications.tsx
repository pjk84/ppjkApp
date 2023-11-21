import styled from "styled-components";

export const Notification = styled.span<{ type?: string }>`
  color: ${(props) => props.theme.darkGray};
  background-color: ${(p) =>
    p.type === "warning"
      ? p.theme.lightRed
      : p.type === "green"
      ? p.theme.lightGreen
      : null};
  font-size: 15px;
  height: max-content;
  border-radius: 5px;
  text-align: center;
`;

export const Warning = styled.span`
  color: ${(props) => props.theme.darkGray};
  background-color: null;
  font-size: 15px;
  height: max-content;
  border-radius: 5px;
  text-align: center;
`;
