import { useEffect, useState } from "react";
import { FlexBox, PageWrapper } from "../../../styles/containers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state";
import apiClient from "../../../api/client";
import { bitvavoActions } from "../../../state/actiontypes";
import Orders from "./Orders";

const Trades = () => {
  return (
    <FlexBox column gapSize={25}>
      <Orders />
    </FlexBox>
  );
};

export default Trades;
