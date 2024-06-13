import {
  Component,
  ComponentHeader,
  FlexBox,
} from "../../../../styles/containers";
import { StdInput } from "../../../../styles/input";
import { StdButton } from "../../../../styles/buttons";
import { ChangeEvent, ReactElement, useState } from "react";
import apiClient from "../../../../api/client";

const markets = ["WIF", "PEPE"];

const CreatePlan = (props: { getTradingPlans: Function }) => {
  type state = {
    market?: string;
    amount?: string;
    sellAt?: string;
    buyAt?: string;
    marketPrice?: string;
  };
  const [state, setState] = useState<state>({});

  const inputComplete = () =>
    state.market && state.amount && state.sellAt && state.buyAt;

  const selectMaker = (market: string) => {
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
      <ComponentHeader>new plan</ComponentHeader>

      <Component>
        <FlexBox gapSize={20}>
          <FlexBox gapSize={10}>
            <FlexBox gapSize={10} column justify="center">
              <label>market</label>
              {state.marketPrice ? <label>price</label> : null}
              <label>amount</label>
              <label>buy at</label>
              <label>sell at</label>
            </FlexBox>
            <FlexBox gapSize={10} column>
              <select
                defaultValue={""}
                style={{ width: "max-content" }}
                onChange={(e) => selectMaker(e.target.value)}
              >
                <option key={`market-option-blank`}></option>
                {markets.map((m) => (
                  <option key={`market-option-${m}`}>{m}</option>
                ))}
              </select>
              {state.marketPrice ?? <div>{state.marketPrice}</div>}
              <StdInput
                type="text"
                placeholder="fill in..."
                value={state.amount}
                onChange={(e) => setState({ ...state, amount: e.target.value })}
              />
              <StdInput
                type="text"
                placeholder="fill in..."
                onChange={(e) => setState({ ...state, buyAt: e.target.value })}
              />
              <StdInput
                type="text"
                placeholder="fill in..."
                onChange={(e) => setState({ ...state, sellAt: e.target.value })}
              />
            </FlexBox>
          </FlexBox>
          {inputComplete() ? (
            <StdButton onClick={() => create()} size="medium">
              create
            </StdButton>
          ) : null}
        </FlexBox>
      </Component>
    </FlexBox>
  );
};

export default CreatePlan;
