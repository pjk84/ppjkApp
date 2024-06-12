import {
  Component,
  ComponentHeader,
  FlexBox,
} from "../../../../styles/containers";
import { StdInput } from "../../../../styles/input";
import { StdButton } from "../../../../styles/buttons";
import { useState } from "react";
import apiClient from "../../../../api/client";

const markets = ["WIF", "PEPE"];

const CreatePlan = (props: { getTradingPlans: Function }) => {
  const [market, setMarket] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);

  const create = () => {
    if (!market) {
      return;
    }
    const plan: CreateTradingPlanPayload = {
      market,
      amount: parseFloat(amount!),
    };
    apiClient()
      .post("/bitvavo/trading-plan", plan)
      .then(() => {
        props.getTradingPlans();
      });
  };
  return (
    <FlexBox column>
      <ComponentHeader>new plan</ComponentHeader>
      <Component>
        <FlexBox gapSize={10} align="center">
          <FlexBox column>
            <label>market</label>
            <select
              defaultValue={""}
              style={{ width: "max-content" }}
              onChange={(e) => setMarket(e.target.value)}
            >
              <option key={`market-option-blank`}></option>
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
          {market && amount ? (
            <StdButton onClick={() => create()} size="small">
              create
            </StdButton>
          ) : null}
        </FlexBox>
      </Component>
    </FlexBox>
  );
};

export default CreatePlan;
