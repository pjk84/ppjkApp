import { combineReducers } from "redux";
import { actions, bitvavoActions, blogActions } from "./actiontypes";
import { now } from "lodash";
import BitvavoReducer from "./Bitvavo";

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

export default combineReducers({
  bitvavo: BitvavoReducer,
  main: appReducer,
  auth: authReducer,
});
