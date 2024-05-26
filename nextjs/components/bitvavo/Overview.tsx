import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actiontypes";
import apiClient from "../../api/client";
import { TableCell, TableHeader } from "../../styles/table";
import { FlexBox } from "../../styles/containers";
import Loader from "../Loaders";
import { Control } from "../../styles/buttons";

type Props = {
  portfolio?: Portfolio;
};

const Overview = ({ portfolio }: Props) => {
  const [showPurchaseHistoryFor, togglePurchaseHistoryFor] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [withFlash, setFlash] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!portfolio) {
      // get portfolio
      getPortfolio();
    }
  });

  var getPortfolio = async () => {
    setIsLoading(true);
    apiClient()
      .get<Portfolio>("/bitvavo/portfolio")
      .then((res) => {
        setIsLoading(false);
        dispatch({
          type: actions.SET_BITVAVO_PORTFOLIO,
          portfolio: res,
        });
      });
  };

  const refreshButton = (
    <Control
      onClick={() => {
        getPortfolio();
        setFlash(true);
      }}
    >
      refresh
    </Control>
  );

  const GetCell = (value: any, index: number, key: string, color?: string) => (
    <TableCell
      color={color}
      animation={withFlash ? "flash" : undefined}
      key={`${key}-{${value}}`}
      index={index}
    >
      {value}
    </TableCell>
  );

  const getAssetComponent = (asset: Asset, index: number) => {
    var {
      priceAction24h,
      available,
      market,
      value,
      amountSpent,
      result,
      transactionHistory,
      returnOnInvestment: roi,
    } = asset;
    return (
      <tr>
        <TableCell index={index}>{market}</TableCell>
        <TableCell index={index}>{available}</TableCell>
        {GetCell(asset.price, index, "price")}
        {GetCell(asset.price24h, index, "price24h")}
        {GetCell(
          `${asset.priceAction24h} %`,
          index,
          "priceAction24h",
          asset.priceAction24h > 0
            ? "green"
            : asset.priceAction24h < 0
            ? "red"
            : ""
        )}
        {GetCell(value, index, "value")}
        <TableCell
          animation={withFlash ? "flash" : undefined}
          key={`spent-{${amountSpent}}`}
          index={index}
        >
          {showPurchaseHistoryFor == market ? (
            purchaseHistory(transactionHistory)
          ) : (
            <div style={{ position: "relative" }}>
              {amountSpent}
              <div
                className="IntableButton"
                onClick={() =>
                  togglePurchaseHistoryFor(
                    showPurchaseHistoryFor == market ? null : asset.market
                  )
                }
              >
                view
              </div>
            </div>
          )}
        </TableCell>
        {GetCell(asset.result, index, "result-value")}
        {GetCell(
          asset.returnOnInvestment,
          index,
          "return-on-investment",
          asset.returnOnInvestment > 0
            ? "green"
            : asset.returnOnInvestment < 0
            ? "red"
            : ""
        )}
      </tr>
    );
  };

  const purchaseHistory = (transactions: TransactionHistoryItem[]) => {
    return (
      <FlexBox column style={{ width: "100%" }}>
        <div
          onClick={() => togglePurchaseHistoryFor(null)}
          style={{ width: "100%", textAlign: "right", cursor: "pointer" }}
        >
          close
        </div>
        <table>
          <tbody>
            <tr>
              {["date", "spent"].map((s) => (
                <TableHeader>{s}</TableHeader>
              ))}
            </tr>
            {transactions.map((d, i) => {
              return (
                <tr>
                  <TableCell index={i}>{d.date}</TableCell>
                  <TableCell index={i}>{d.amountSpent}</TableCell>
                </tr>
              );
            })}
            <tr>
              <TableCell index={0}>total spent</TableCell>
              <TableCell index={0}>
                {transactions.reduce((sum, i) => sum + i.amountSpent, 0)}
              </TableCell>
            </tr>
            <tr>
              <TableCell index={0}>total fees</TableCell>
              <TableCell index={0}>
                {transactions.reduce((sum, i) => sum + i.fees, 0)}
              </TableCell>
            </tr>
          </tbody>
        </table>
      </FlexBox>
    );
  };

  const total = () => {
    const totalRoi = portfolio?.totalResult ?? 0;
    const index = portfolio?.assets.length ?? 0;
    return (
      <tr>
        <TableCell index={index}>TOTAL</TableCell>
        <TableCell index={index}></TableCell>
        <TableCell index={index}></TableCell>
        <TableCell index={index}></TableCell>
        <TableCell index={index}></TableCell>
        <TableCell index={index}>{portfolio?.totalValue}</TableCell>
        <TableCell index={index}>{portfolio?.totalSpent}</TableCell>
        <TableCell index={index}>{totalRoi}</TableCell>
        <TableCell
          color={totalRoi > 0 ? "green" : totalRoi < 0 ? "red" : ""}
          index={index}
        >
          {`${portfolio?.totalReturnOnInvestment} %`}
        </TableCell>
      </tr>
    );
  };

  if (!portfolio) {
    return (
      <FlexBox justify="center">
        <Loader text="loading assetes..." type="round" />
      </FlexBox>
    );
  }

  return (
    <FlexBox column gapSize={10}>
      <FlexBox style={{ opacity: "0.5" }} gapSize={25}>
        <div> last updated: {portfolio.fetchedAt}</div>
      </FlexBox>
      <table>
        <tbody>
          <tr>
            {[
              "asset",
              "available",
              "price",
              "price 24h",
              "24h",
              "value",
              "spent",
              "result",
              "Roi",
            ].map((s) => (
              <TableHeader>{s}</TableHeader>
            ))}
          </tr>

          {portfolio?.assets.map((a, i) => getAssetComponent(a, i))}
          {total()}
        </tbody>
      </table>
      <FlexBox color="blue" align="center" gapSize={25}>
        {isLoading ? "fetching assets..." : refreshButton}
      </FlexBox>
    </FlexBox>
  );
};

export default Overview;