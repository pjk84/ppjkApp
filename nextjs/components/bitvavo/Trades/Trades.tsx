import {
  Component,
  ComponentHeader,
  FlexBox,
} from "../../../styles/containers";
import Orders from "./Orders";
import TradingLogs from "./TradingLogs";
import TradingPlans from "./TradingPlans/TradingPlans";

const Trades = () => {
  return (
    <FlexBox gapSize={20} wrap="true">
      <TradingPlans />
      <Orders />
      <TradingLogs />
    </FlexBox>
  );
};

export default Trades;
