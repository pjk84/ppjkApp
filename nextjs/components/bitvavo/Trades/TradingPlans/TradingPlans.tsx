import { useEffect, useState } from "react";
import { StdButton } from "../../../../styles/buttons";
import { FlexBox } from "../../../../styles/containers";
import { StdInput } from "../../../../styles/input";
import apiClient from "../../../../api/client";
import { useDispatch, useSelector } from "react-redux";
import { bitvavoActions } from "../../../../state/actiontypes";
import { RootState } from "../../../../state";
import { TableHeader } from "../../../../styles/table";
import TradingPlan from "./Plan";

const markets = ["WIF", "PEPE"];

const TradingPlans = () => {
  const tradingLogs = useSelector(
    (state: RootState) => state.bitvavo.tradingLogs
  );
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

  const createdPlans = (
    <FlexBox>
      <table>
        <tbody>
          <tr>
            {["listening", "market", "amount", "created at", ""].map((h) => (
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
              {markets.map((m) => (
                <option key={`market-option-${m}`}>{m}</option>
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
      {tradingPlans && tradingPlans.length > 0 ? (
        createdPlans
      ) : (
        <div>no plans found...</div>
      )}
    </FlexBox>
  );
};

export default TradingPlans;
