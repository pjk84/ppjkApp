import styled from "styled-components";

export const Warning = styled.span<{}>`
  color: ${(props) => props.theme.darkGray};
  background-color: ${(props) => props.theme.red};
  font-size: 15px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
`;
