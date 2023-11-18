import styled from "styled-components";

export const BarHorizontal = styled.div<{ text: string }>`
  background-color: ${(p) => p.theme.barChart.backgroundColor};
  color: ${(p) => p.theme.barChart.textColor};
  &:before {
    content: "${(p) => p.text}";
    color: ${(p) => p.theme.barChart.labelColor};
    margin-left: 5px;
    line-height: 30px;
    font-size: 20px;
  }
`;

export const AxisX = styled.div<{ text: string }>`
  display: flex;
  border-top: 1px solid;
  margin-top: 5px;
  border-top-color: ${(p) => p.theme.barChart.textColor};
  color: ${(p) => p.theme.barChart.textColor};
  &:before {
    content: "${(p) => p.text}";
    position: absolute;
    color: ${(p) => p.theme.barChart.textColor};
    font-size: 15px;
  }
`;

export const AxisXPoint = styled.div<{ width: string; text: string }>`
  position: relative;
  width: ${(p) => p.width};
  &:after {
    content: "${(p) => p.text}";
    position: absolute;
    right: -5px;
    color: ${(p) => p.theme.barChart.textColor};
    font-size: 15px;
  }
`;

// <div
//   key={`x-axis-${e}`}
//   style={{
//     border: "1px solid red",
//     textAlign: "right",
//     width: `${(1 / maxExp) * 100}% `,
//     height: 10,
//   }}
// >
//   {e + 1}
// </div>;
