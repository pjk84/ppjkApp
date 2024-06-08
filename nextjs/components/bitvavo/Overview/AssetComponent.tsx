import { useDispatch, useSelector } from "react-redux";
import { TableCell } from "../../../styles/table";
import { bitvavoActions } from "../../../state/actiontypes";
import PurchaseHistory from "./PurchaseHistory";
import { RootState } from "../../../state";

const GetCell = (value: any, index: number, key: string, color?: string) => (
  <TableCell
    color={color}
    animation={"flash"}
    key={`${key}-{${value}}`}
    index={index}
  >
    {value}
  </TableCell>
);

const AssetRow = (props: { asset: Asset; index: number }) => {
  const { asset, index } = props;
  const dispatch = useDispatch();

  const showPurchaseHistoryFor = useSelector(
    (state: RootState) => state.bitvavo.showPurchaseHistoryFor
  );
  var { available, market, value, amountSpent, transactionHistory } = asset;

  const togglePurchaseHistoryForMarket = (market?: string) => {
    dispatch({ type: bitvavoActions.TOGGLE_PURCHASE_HISTORY_FOR, market });
  };
  return (
    <tr key={`asset-row-${asset.market}`}>
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
        animation={"flash"}
        key={`spent-{${amountSpent}}`}
        index={index}
      >
        {showPurchaseHistoryFor == market ? (
          <div onClick={() => togglePurchaseHistoryForMarket(undefined)}>
            <PurchaseHistory transactions={transactionHistory} />
          </div>
        ) : (
          <div
            key={`spent-${asset.amountSpent}`}
            style={{ position: "relative" }}
          >
            {amountSpent}
            <div
              key={`view-purchase-history-${asset}`}
              className="IntableButton"
              onClick={() =>
                togglePurchaseHistoryForMarket(
                  showPurchaseHistoryFor == market ? undefined : asset.market
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
        `${asset.returnOnInvestment} %`,
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

export default AssetRow;
