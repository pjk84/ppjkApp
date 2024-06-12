import { Order } from "../components/Bitvavo/Trades/Orders";
import TradingPlan from "../components/Bitvavo/Trades/TradingPlans/TradingPlans";
import { actions, bitvavoActions } from "./actiontypes";

type Action = {
  type: string;
  [Key: string]: any;
};

type IBitvavState = {
  showPurchaseHistoryFor?: string;
  portfolio?: Portfolio;
  orders?: Order[];
  tradingPlans?: TradingPlan[];
  tradingLogs: TradingLog[];
  snapshots?: PortfolioSnapshot[];
  page?: string;
  websocket?: WebSocket;
};

const initialBitvavoState: IBitvavState = {
  portfolio: undefined,
  snapshots: undefined,
  websocket: undefined,
  tradingLogs: [],
  tradingPlans: undefined,
};

const BitvavoReducer = (
  state = initialBitvavoState,
  action: Action
): IBitvavState => {
  switch (action.type) {
    case actions.HANDLE_TICKER: {
      return {
        ...state,
      };
    }
    case actions.SET_BITVAVO_PORTFOLIO: {
      return {
        ...state,
        portfolio: action.portfolio,
      };
    }
    case bitvavoActions.ADD_TRADING_LOG: {
      return {
        ...state,
        tradingLogs: [...[action.log], ...state.tradingLogs],
      };
    }
    case bitvavoActions.CLEAR_LOGS: {
      return {
        ...state,
        tradingLogs: [],
      };
    }
    case bitvavoActions.SET_TRADING_PLANS: {
      return {
        ...state,
        tradingPlans: action.plans,
      };
    }
    case bitvavoActions.SET_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    case actions.SET_BITVAVO_SNAPSHOTS: {
      return {
        ...state,
        snapshots: action.snapshots,
      };
    }
    case actions.SET_BITVAVO_PAGE: {
      return {
        ...state,
        page: action.page,
      };
    }
    case bitvavoActions.SET_WEBSOCKET: {
      return {
        ...state,
        websocket: action.webSocket,
      };
    }
    case bitvavoActions.TOGGLE_PURCHASE_HISTORY_FOR: {
      return {
        ...state,
        showPurchaseHistoryFor: action.market,
      };
    }
    default:
      return state;
  }
};
export default BitvavoReducer;
