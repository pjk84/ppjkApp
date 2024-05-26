import styled from "styled-components";

export const ChartBar = styled.div<{ height: number; text?: string }>`
  background-color: ${(p) => p.theme.barChart.backgroundColor.inactive};
  height: ${(p) => `${p.height}px`};
  z-index: 1;
  &:hover {
    background-color: ${(p) => p.theme.barChart.backgroundColor.active};
    &::before {
      visibility: visible;
    }
    &::after {
      visibility: visible;
    }
  }
  &:before {
    content: "${(p) => p.text}";
    /* height: 100%; */
    position: absolute;
    color: ${(p) => p.theme.barChart.label.text};
    font-size: 15px;
    padding: 0px 5px 0px 5px;
    left: 50%;
    transform: translate(-50%, -100%);
    top: 0;
    visibility: hidden;
  }
  &:after {
    position: absolute;
    content: "";
    width: 1px;
    height: 100%;
    top: 0;
    opacity: 0.3;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    background-color: ${(p) => p.theme.barChart.backgroundColor.active};
    visibility: hidden;
  }
`;

export const ChartLine = styled.div<{
  height: number;
  position: number;
  label: number;
}>`
  position: absolute;
  height: ${(p) => `${p.height}px`};
  width: 100%;
  border-top: 1px solid;
  border-color: ${(p) => p.theme.barChart.lineColor};
  /* background-color: blue; */
  top: ${(p) => `${p.position}px`};
  &:before {
    content: "${(p) => p.label}";
    position: absolute;
    color: ${(p) => p.theme.barChart.label.text};
    font-size: 15px;
  }
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
