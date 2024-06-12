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
    <FlexBox column gapSize={50}>
      <FlexBox column>
        <ComponentHeader>Trading plans</ComponentHeader>
        <Component>
          <TradingPlans />
        </Component>
      </FlexBox>

      <FlexBox column>
        <ComponentHeader>Trading logs</ComponentHeader>
        <Component maxHeight={400}>
          <TradingLogs />
        </Component>
      </FlexBox>
      <FlexBox column>
        <ComponentHeader>Trading orders</ComponentHeader>
        <Component>
          <Orders />
        </Component>
      </FlexBox>
    </FlexBox>
  );
};

export default Trades;
