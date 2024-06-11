import { Component, FlexBox } from "../../../styles/containers";
import Orders from "./Orders";
import TradingPlans from "./TradingPlans/TradingPlans";

const Trades = () => {
  return (
    <FlexBox column gapSize={50}>
      <Component name={"Trading plans:"}>
        <TradingPlans />
      </Component>
      <Component name={"Orders:"}>
        <Orders />
      </Component>
    </FlexBox>
  );
};

export default Trades;
