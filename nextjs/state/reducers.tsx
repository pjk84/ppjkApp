import { combineReducers } from "redux";
import { actions, blogActions } from "./actiontypes";
import { now } from "lodash";

type Action = {
  type: string;
  [Key: string]: any;
};

type IAppState = {
  active: Array<string>;
  project?: string;
  loggedIn?: boolean;
  loggedInIdentity?: string;
  auth: {
    loggedIn?: boolean;
    loggedInIdentity?: string;
    error?: string;
  };
  focus?: string;
  theme?: string;
  showSideBar: boolean;
};

const initialAppState: IAppState = {
  active: [],
  auth: {
    loggedIn: false,
  },
  showSideBar: false,
};

type IAuthState = {
  loggedIn?: boolean;
  loggedInIdentity?: string;
  error?: string;
};

const initialAuthState: IAuthState = {
  loggedIn: false,
  loggedInIdentity: undefined,
  error: undefined,
};

type IBitvavState = {
  portfolio?: Portfolio;
  snapshots?: PortfolioSnapshot[];
  page?: string;
  websocket: boolean;
};

const initialBitvavoState: IBitvavState = {
  portfolio: undefined,
  snapshots: undefined,
  page: "balance",
  websocket: false,
};

const appReducer = (state = initialAppState, action: Action): IAppState => {
  switch (action.type) {
    case actions.SET_ACTIVE: {
      return {
        ...state,
        focus: action.id,
        active: state.active.includes(action.id)
          ? [
              ...state.active.slice(0, state.active.indexOf(action.id)),
              ...state.active.slice(state.active.indexOf(action.id) + 1),
            ]
          : [...state.active, ...[action.id]],
      };
    }
    case actions.SET_FOCUS: {
      return { ...state, focus: action.focus };
    }
    case actions.SELECT_PROJECT: {
      return { ...state, project: action.id };
    }
    case actions.TOGGLE_SIDE_BAR: {
      return { ...state, showSideBar: !state.showSideBar };
    }
    case actions.SET_THEME: {
      return { ...state, theme: action.theme };
    }
    default:
      return state;
  }
};

const authReducer = (state = initialAuthState, action: Action): IAuthState => {
  switch (action.type) {
    case actions.LOGIN: {
      return {
        loggedIn: true,
        loggedInIdentity: action.identity,
        error: undefined,
      };
    }
    case actions.LOGOUT: {
      return {
        loggedIn: false,
        loggedInIdentity: undefined,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

const bitvavoReducer = (
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
    case actions.TOGGLE_WEBSOCKET: {
      return {
        ...state,
        websocket: !state.websocket,
      };
    }
    default:
      return state;
  }
};
export default combineReducers({
  bitvavo: bitvavoReducer,
  main: appReducer,
  auth: authReducer,
});
