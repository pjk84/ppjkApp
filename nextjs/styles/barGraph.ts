import styled from "styled-components";

export const BarHorizontal = styled.div<{ height: string }>`
  background-color: ${(p) => p.theme.barChart.backgroundColor};
  height: ${(p) => p.height};
  z-index: 1;
`;

export const BarHorizontalLabel = styled.div`
  color: ${(p) => p.theme.barChart.labelColor};
  position: absolute;
  left: 5px;
  z-index: 2;
`;

export const BarGraphMain = styled.div<{ gapSize: number }>`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow: hidden;
  flex-direction: column;
  gap: ${(p) => `${p.gapSize}px`};
  /* border-top: 1px solid; */
  border-bottom: 1px solid;
  border-color: ${(p) => p.theme.barChart.textColor};
`;

export const AxisX = styled.div<{ text: string }>`
  display: flex;
  margin-top: 5px;
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
