import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../state/actiontypes";
import apiClient from "../../../api/client";
import { TableCell, TableHeader } from "../../../styles/table";
import { FlexBox } from "../../../styles/containers";
import Loader from "../../Loaders";
import { Control } from "../../../styles/buttons";
import Websocket from "./Websocket";
import { RootState } from "../../../state";
import Total from "./Total";
import PurchaseHistory from "./PurchaseHistory";
import AssetRow from "./AssetComponent";

type Props = {
  portfolio?: Portfolio;
};

const header = [
  "asset",
  "available",
  "price",
  "price 24h",
  "24h",
  "value",
  "spent",
  "result",
  "Roi",
];

const Overview = ({ portfolio }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState(false);
  const dispatch = useDispatch();
  const websocket = useSelector((state: RootState) => state.bitvavo.websocket);
  const lastUpdatedAt = useSelector(
    (state: RootState) => state.bitvavo.portfolio?.fetchedAt
  );

  useEffect(() => {
    if (!portfolio && !isLoading && !err) {
      // get portfolio
      getPortfolio();
    }
  });

  var getPortfolio = async () => {
    setIsLoading(true);
    apiClient()
      .get<Portfolio>("/bitvavo/portfolio")
      .then((res) => {
        if (!res) {
          setError(true);
        }
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
      }}
    >
      refresh
    </Control>
  );

  if (!portfolio) {
    return (
      <FlexBox justify="center">
        {isLoading ? (
          <Loader text="loading assetes..." type="round" />
        ) : (
          <FlexBox column align="center" gapSize={25}>
            <div>could not get portfolio...</div>
            {refreshButton}
          </FlexBox>
        )}
      </FlexBox>
    );
  }

  return (
    <FlexBox column gapSize={10}>
      <FlexBox align="center" gapSize={25}>
        <Websocket />
        <div style={{ opacity: 0.5 }}> last updated: {lastUpdatedAt}</div>
        <div>
          {isLoading ? "fetching assets..." : websocket ? null : refreshButton}
        </div>
      </FlexBox>
      <table>
        <tbody>
          <tr>
            {header.map((s) => (
              <TableHeader key={`overiew-header-${s}`}>{s}</TableHeader>
            ))}
          </tr>

          {portfolio?.assets.map((a, i) => (
            <AssetRow index={i} asset={a} />
          ))}
          <Total
            index={portfolio.assets.length}
            totalReturnOnInvestment={portfolio.totalReturnOnInvestment}
            totalSpent={portfolio.totalSpent}
            totalResult={portfolio.totalResult}
            totalValue={portfolio.totalValue}
          />
        </tbody>
      </table>
    </FlexBox>
  );
};

export default Overview;
