import { useEffect, useState } from "react";
import { FlexBox } from "../../../styles/containers";
import { Header1 } from "../../../styles/header";
import { TableCell, TableHeader } from "../../../styles/table";
import Loader from "../../Loaders";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state";
import { bitvavoActions } from "../../../state/actiontypes";
import apiClient from "../../../api/client";
import { log } from "console";

const TradingLogs = () => {
  const logs = useSelector((state: RootState) => state.bitvavo.tradingLogs);

  const GetCell = (value: any, index: number, id: string) => (
    <TableCell animation="flash" key={`trading-log-${id}`} index={index}>
      {value}
    </TableCell>
  );

  if (logs?.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        <tr>
          {["market", "price", "time", "action"].map((h) => (
            <TableHeader key={`header-${h}`}>{h}</TableHeader>
          ))}
        </tr>
        {logs?.map((l, i) => (
          <tr>
            {[
              GetCell(l.market, i, l.id),
              GetCell(l.price, i, l.id),
              GetCell(l.time, i, l.id),
              GetCell(l.action, i, l.id),
            ]}
          </tr>
        ))}
      </tbody>
    </table>
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
