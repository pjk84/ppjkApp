import React from "react";
import { TableCell, TableHeader } from "../../../styles/table";
import { FlexBox } from "../../../styles/containers";

const PurchaseHistory = (props: { transactions: TransactionHistoryItem[] }) => {
  return (
    <FlexBox column style={{ width: "100%" }}>
      <div style={{ width: "100%", textAlign: "right", cursor: "pointer" }}>
        close
      </div>
      <table>
        <tbody>
          <tr>
            {["date", "spent"].map((s) => (
              <TableHeader key={`table-header-${s}`}>{s}</TableHeader>
            ))}
          </tr>
          {props.transactions.map((d, i) => {
            return (
              <tr key={`transaction-${d.date}`}>
                <TableCell index={i}>{d.date}</TableCell>
                <TableCell index={i}>{d.amountSpent}</TableCell>
              </tr>
            );
          })}
          <tr>
            <TableCell index={0}>total spent</TableCell>
            <TableCell index={0}>
              {props.transactions.reduce((sum, i) => sum + i.amountSpent, 0)}
            </TableCell>
          </tr>
          <tr>
            <TableCell index={0}>total fees</TableCell>
            <TableCell index={0}>
              {props.transactions.reduce((sum, i) => sum + i.fees, 0)}
            </TableCell>
          </tr>
        </tbody>
      </table>
    </FlexBox>
  );
};

export default PurchaseHistory;
