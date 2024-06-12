import { useEffect, useState } from "react";
import {
  Component,
  ComponentHeader,
  FlexBox,
} from "../../../styles/containers";
import { Header1 } from "../../../styles/header";
import { TableCell, TableHeader } from "../../../styles/table";
import Loader from "../../Loaders";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state";
import { bitvavoActions } from "../../../state/actiontypes";
import apiClient from "../../../api/client";
import { log } from "console";
import { StdButton } from "../../../styles/buttons";

const TradingLogs = () => {
  const logs = useSelector((state: RootState) => state.bitvavo.tradingLogs);
  const dispatch = useDispatch();
  const GetCell = (value: any, index: number, id: string) => (
    <TableCell key={`trading-log-${id}`} index={index}>
      {value}
    </TableCell>
  );

  const clearLogs = () => {
    dispatch({
      type: bitvavoActions.CLEAR_LOGS,
    });
  };

  if (logs.length === 0) {
    return null;
  }

  const main = (
    <table>
      <tbody>
        <tr>
          {["market", "price", "time", "action"].map((h) => (
            <TableHeader key={`header-${h}`}>{h}</TableHeader>
          ))}
        </tr>
        {logs?.map((l, i) => (
          <tr
            key={`log-${l.id}`}
            style={{ animation: "0.5s slideInRight ease-in" }}
          >
            {[
              GetCell(l.market, i, `market-${l.id}`),
              GetCell(l.price, i, `price-${l.id}`),
              GetCell(l.time, i, `time-${l.id}`),
              GetCell(l.action, i, `action-${l.id}`),
            ]}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <FlexBox column>
      <ComponentHeader>
        <div>Trading logs</div>
        <StdButton onClick={clearLogs} size="small">
          flush
        </StdButton>
      </ComponentHeader>
      <Component maxHeight={400}>{main}</Component>
    </FlexBox>
  );
};

export default TradingLogs;

// export type Order = {
//   market: string;
//   createdAt: string;
//   status: string;
//   orderType: string;
//   price: number;
// };
