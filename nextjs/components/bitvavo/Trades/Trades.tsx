import { Component, FlexBox } from "../../../styles/containers";
import Orders from "./Orders";
import TradingPlan from "./TradingPlan";

const Trades = () => {
  return (
    <FlexBox column gapSize={50}>
      <Component name={"Trading plans:"}>
        <TradingPlan />
      </Component>
      <Component name={"Orders:"}>
        <Orders />
      </Component>
    </FlexBox>
  );
};

export default Trades;
