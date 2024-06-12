import { useEffect, useState } from "react";
import { StdButton } from "../../../../styles/buttons";
import {
  Component,
  ComponentHeader,
  FlexBox,
} from "../../../../styles/containers";
import { StdInput } from "../../../../styles/input";
import apiClient from "../../../../api/client";
import { useDispatch, useSelector } from "react-redux";
import { bitvavoActions } from "../../../../state/actiontypes";
import { RootState } from "../../../../state";
import { TableHeader } from "../../../../styles/table";
import TradingPlan from "./Plan";
import CreatePlan from "./CreatePlan";
import TradingLogs from "../TradingLogs";

const TradingPlans = () => {
  const tradingPlans = useSelector(
    (state: RootState) => state.bitvavo.tradingPlans
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tradingPlans) {
      getTradingPlans();
    }
  });

  const getTradingPlans = () => {
    apiClient()
      .get<TradingPlan[]>("/bitvavo/trading-plans")
      .then((res) => {
        dispatch({
          type: bitvavoActions.SET_TRADING_PLANS,
          plans: res,
        });
      });
  };

  const createdPlans = (
    <FlexBox>
      <table>
        <tbody>
          <tr>
            {["logs", "market", "amount", "created at"].map((h) => (
              <TableHeader key={`header-${h}`}>{h}</TableHeader>
            ))}
          </tr>
          {tradingPlans?.map((t, i) => (
            <tr key={`order-row-${i}`}>
              <TradingPlan
                details={t}
                index={i}
                getTradingPlans={getTradingPlans}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </FlexBox>
  );

  return (
    <div>
      <ComponentHeader>Trading plans</ComponentHeader>
      <Component>
        {tradingPlans && tradingPlans.length > 0 ? (
          createdPlans
        ) : (
          <div>no plans found...</div>
        )}
        <CreatePlan getTradingPlans={getTradingPlans} />
      </Component>
    </div>
  );
};

export default TradingPlans;
