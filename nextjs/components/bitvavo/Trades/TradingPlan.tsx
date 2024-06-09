import { useEffect, useState } from "react";
import { StdButton } from "../../../styles/buttons";
import { FlexBox } from "../../../styles/containers";
import { StdInput } from "../../../styles/input";
import apiClient from "../../../api/client";
import { useDispatch, useSelector } from "react-redux";
import { bitvavoActions } from "../../../state/actiontypes";
import { RootState } from "../../../state";
import { TableCell, TableHeader } from "../../../styles/table";
import { ComponentHeader } from "../../../styles/header";

const markets = ["WIF", "PEPE"];

const TradingPlan = () => {
  const [market, setMarket] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("0");
  const tradingPlans = useSelector(
    (state: RootState) => state.bitvavo.tradingPlans
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tradingPlans) {
      getTradingPlans();
    }
  });

  const createPlan = () => {
    if (!market) {
      return;
    }
    const plan: CreateTradingPlanPayload = {
      market,
      amount: parseFloat(amount),
    };
    apiClient()
      .post("/bitvavo/trading-plan", plan)
      .then(() => {
        getTradingPlans();
      });
  };

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

  const deletePlan = (planId: string) => {
    console.log("!@#@!#@!#!@");
    apiClient()
      .del(`/bitvavo/trading-plan/${planId}`)
      .then(() => {
        getTradingPlans();
      });
  };

  const GetCell = (value: any, index: number, key: string, color?: string) => (
    <TableCell color={color} key={`${key}-{${value}}`} index={index}>
      {value}
    </TableCell>
  );

  const activePlans = (
    <FlexBox>
      <table>
        <tbody>
          <tr>
            {["market", "amount", "created at"].map((h) => (
              <TableHeader key={`header-${h}`}>{h}</TableHeader>
            ))}
          </tr>
          {tradingPlans?.map((t, i) => (
            <tr key={`order-row-${i}`}>
              {[
                GetCell(t.market, i, "market"),
                GetCell(t.amount, i, "amount"),
                GetCell(t.createdAt, i, "created_at"),
                GetCell(
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => deletePlan(t.id)}
                  >
                    ❌
                  </div>,
                  i,
                  "delete"
                ),
              ]}
            </tr>
          ))}
        </tbody>
      </table>
    </FlexBox>
  );
  const newPlan = (
    <FlexBox column gapSize={5} wrap="true" style={{ width: "max-content" }}>
      <FlexBox align="center" gapSize={20}>
        <FlexBox gapSize={10}>
          <FlexBox column>
            <label>market</label>
            <select
              style={{ width: "max-content" }}
              onChange={(e) => setMarket(e.target.value)}
            >
              <option disabled selected></option>
              {markets.map((m) => (
                <option>{m}</option>
              ))}
            </select>
          </FlexBox>
          <FlexBox column>
            <label>amount</label>
            <StdInput
              type="text"
              placeholder="fill in..."
              onChange={(e) => setAmount(e.target.value)}
            />
          </FlexBox>
        </FlexBox>
        <StdButton onClick={() => createPlan()} size="small">
          create plan
        </StdButton>
      </FlexBox>
    </FlexBox>
  );

  return (
    <FlexBox column gapSize={25}>
      {newPlan}
      {activePlans}
    </FlexBox>
  );
};

export default TradingPlan;
