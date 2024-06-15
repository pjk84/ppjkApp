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
  type state = {
    market?: string;
    amount?: string;
    sellAt?: string;
    buyAt?: string;
    action?: string;
    balance?: string;
    marketPrice?: string;
  };
  const [state, setState] = useState<state>({});

  const inputComplete = () =>
    state.market && state.amount && state.sellAt && state.buyAt;

  const selectMaket = (market: string) => {
    if (market === "") {
      return setState({ ...state, market: undefined });
    }
    apiClient()
      .get(`/bitvavo/market/price?market=${market}`)
      .then((e) => {
        var d = e as { price: string };
        setState({ ...state, marketPrice: d.price, market });
      });
  };

  const marketPrice = (
    <FlexBox column gapSize={5} color="green">
      <div>{state.market ? "market price:" : ""}</div>
      <div>{state.marketPrice}</div>
    </FlexBox>
  );

  const create = () => {
    if (!state.market) {
      return;
    }
    const plan: CreateTradingPlanPayload = {
      market: state.market,
      amount: parseFloat(state.amount!),
      buyAt: parseFloat(state.buyAt!),
      sellAt: parseFloat(state.sellAt!),
    };
    apiClient()
      .post("/bitvavo/trading-plan", plan)
      .then(() => {
        props.getTradingPlans();
        setState({});
      });
  };
  return (
    <FlexBox column>
      <ComponentHeader inner>creaate new plan</ComponentHeader>
      <Component>
        <FlexBox>
          <FlexBox gapSize={20} align="end" justify="between">
            <FlexBox gapSize={10}>
              <FlexBox gapSize={5} column justify="center">
                <FlexBox column>
                  <label>market</label>
                  <select
                    defaultValue={""}
                    style={{ width: "max-content" }}
                    onChange={(e) => selectMaket(e.target.value)}
                  >
                    <option key={`market-option-blank`}></option>
                    {markets.map((m) => (
                      <option key={`market-option-${m}`}>{m}</option>
                    ))}
                  </select>
                </FlexBox>
                <FlexBox column>
                  <label>action</label>
                  <select
                    defaultValue={""}
                    style={{ width: "max-content" }}
                    onChange={(e) =>
                      setState({ ...state, action: e.target.value })
                    }
                  >
                    <option key={`market-option-buy`}>buy</option>
                    <option key={`market-option-sell`}>sell</option>
                  </select>
                </FlexBox>
                <FlexBox column>
                  <label>amount</label>
                  <StdInput
                    type="text"
                    placeholder="fill in..."
                    value={state.amount}
                    onChange={(e) =>
                      setState({ ...state, amount: e.target.value })
                    }
                  />
                </FlexBox>
                <FlexBox column>
                  <label>buy at</label>
                  <StdInput
                    type="text"
                    placeholder="fill in..."
                    onChange={(e) =>
                      setState({ ...state, buyAt: e.target.value })
                    }
                  />
                </FlexBox>
                <FlexBox column>
                  <label>sell at</label>
                  <StdInput
                    type="text"
                    placeholder="fill in..."
                    onChange={(e) =>
                      setState({ ...state, sellAt: e.target.value })
                    }
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <FlexBox column justify="between" style={{ height: "100%" }}>
              {marketPrice}
              <StdButton onClick={() => create()} size="medium">
                create
              </StdButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Component>
    </FlexBox>
  );
};

export default CreatePlan;
