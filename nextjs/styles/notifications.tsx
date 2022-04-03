import styled from "styled-components";

export const Warning = styled.span<{}>`
  color: ${(props) => props.theme.red};
  font-size: 15px;
`;
