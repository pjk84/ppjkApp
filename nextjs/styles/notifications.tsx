import styled from "styled-components";

export const Warning = styled.span<{}>`
  color: ${(props) => props.theme.red};
  border: 1px solid;
  border-color: ${(props) => props.theme.red};
  font-size: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 5px;
`;
