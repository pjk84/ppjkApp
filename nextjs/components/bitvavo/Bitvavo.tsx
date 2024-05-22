import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state";
import { actions } from "../../state/actiontypes";
import apiClient from "../../api/client";
import { TableCell, TableHeader } from "../../styles/table";
import { FlexBox, PageWrapper } from "../../styles/containers";
import { StdButton } from "../../styles/buttons";
import Loader from "../Loaders";

const Bitvavo = () => {
  const [showPurchaseHistoryFor, togglePurchaseHistoryFor] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const portfolio = useSelector((state: RootState) => state.bitvavo.portfolio);
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
    <StdButton size="small" onClick={() => getPortfolio()}>
      refresh
    </StdButton>
  );

  const getAssetComponent = (asset: Asset, index: number) => {
    var {
      price,
      price24h,
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
        <TableCell animation={"flash"} key={`price-{${price}}`} index={index}>
          {price}
        </TableCell>
        <TableCell
          animation={"flash"}
          key={`price24h-{${price24h}}`}
          index={index}
        >
          {price24h}
        </TableCell>
        <TableCell
          color={priceAction24h > 0 ? "green" : priceAction24h < 0 ? "red" : ""}
          animation={"flash"}
          key={`price24h-{${priceAction24h}}`}
          index={index}
        >
          {`${priceAction24h} %`}
        </TableCell>
        <TableCell animation={"flash"} key={`value-{${value}}`} index={index}>
          {value}
        </TableCell>
        <TableCell
          animation={"flash"}
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
        <TableCell
          animation={"flash"}
          key={`result-value-{${value}}`}
          index={index}
        >
          {result}
        </TableCell>
        <TableCell
          color={roi > 0 ? "green" : roi < 0 ? "red" : ""}
          animation={"flash"}
          key={`result-percentage-{${roi}}`}
          index={index}
        >
          {`${roi} %`}
        </TableCell>
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
      <PageWrapper center>
        <Loader type="round" text="fetching assets..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper center maxWidth={1200}>
      <FlexBox column gapSize={10}>
        <FlexBox gapSize={25}>
          <div> currency: Euro</div>
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
          {refreshButton}
          {isLoading ? "fetching assets..." : null}
        </FlexBox>
      </FlexBox>
    </PageWrapper>
  );
};

export default Bitvavo;
