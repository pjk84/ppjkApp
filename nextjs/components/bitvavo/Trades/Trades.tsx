import { FlexBox } from "../../../styles/containers";
import { Header1 } from "../../../styles/header";
import Orders from "./Orders";
import TradingPlan from "./TradingPlan";

const Trades = () => {
  return (
    <FlexBox column gapSize={50}>
      <FlexBox column gapSize={25}>
        <Header1>Trading plans:</Header1>
        <TradingPlan />
      </FlexBox>
      <FlexBox column gapSize={25}>
        <Header1>Orders:</Header1>
        <Orders />
      </FlexBox>
    </FlexBox>
  );
};

export default Trades;
