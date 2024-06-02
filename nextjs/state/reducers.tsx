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

type IBitvavState = {
  timeFetched?: Date;
  portfolio?: Portfolio;
  snapshots?: PortfolioSnapshot[];
  page?: string;
};

const initialBitvavoState: IBitvavState = {
  portfolio: undefined,
  snapshots: undefined,
  page: "balance",
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
    case actions.SET_LOGGED_IN: {
      return {
        ...state,
        auth: {
          loggedIn: action.loggedIn,
          loggedInIdentity: action.identity,
          error: action.error,
        },
      };
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

const bitvavoReducer = (
  state = initialBitvavoState,
  action: Action
): IBitvavState => {
  switch (action.type) {
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
    default:
      return state;
  }
};
export default combineReducers({
  bitvavo: bitvavoReducer,
  main: appReducer,
});
