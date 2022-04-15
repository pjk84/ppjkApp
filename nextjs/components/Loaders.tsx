import React from "react";
import { FlexBox, FlexBoxCentered } from "../styles/containers";
import { LoaderDiv } from "../styles/loaders";
import { appTheme } from "../styles";

type Props = {
  type: "dots" | "round" | "roundSmall";
  text: string;
};

const theme = {
  borderColor: `${appTheme.lightGreen} transparent transparent transparent`,
};

const loader = ({ type, text }: Props) => {
  if (!text) {
    text = "loading";
  }

  const loader = () => {
    switch (type) {
      case "round":
        return (
          <FlexBoxCentered>
            <div className="lds-ring">
              <div style={{ ...theme }}></div>
              <div style={{ ...theme }}></div>
              <div style={{ ...theme }}></div>
              <div style={{ ...theme }}></div>
            </div>
            <div>{`${text}...`}</div>
          </FlexBoxCentered>
        );
      case "roundSmall":
        return (
          <FlexBox gapSize="large" color="blue">
            <div>{`${text}...`}</div>
            <div className="lds-ring ringSmall">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </FlexBox>
        );
      case "dots":
        return (
          <FlexBox>
            <div className="bold">{`${text}`}</div>
            <div className="lds-ellipsis" style={{ height: 25 }}>
              <LoaderDiv></LoaderDiv>
              <LoaderDiv></LoaderDiv>
              <LoaderDiv></LoaderDiv>
              <LoaderDiv></LoaderDiv>
            </div>
          </FlexBox>
        );
      default:
        break;
    }
  };

  return <>{loader()}</>;
};

export default loader;
