import { Post } from "../components/blog/types";
import { combineReducers } from "redux";
import { actions, blogActions } from "./actiontypes";

type Action = {
  type: string;
  [Key: string]: any;
};

type Istate = {
  active: Array<string>;
  project?: string;
  loggedIn?: boolean;
  focus?: string;
  theme?: string;
};

type IblogState = {
  addingPost?: boolean;
  activePost?: Post;
  posts?: Array<Post>;
  editingPost?: string;
  deletingPost?: string;
  title?: string;
  warning?: string;
  isPosting?: boolean;
  loader?: string;
  body?: string;
  loaded?: boolean;
  draft?: Post;
};

const initialState: Istate & IblogState = {
  active: [],
  posts: undefined,
};

const appReducer = (state = initialState, action: Action) => {
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
      return { ...state, loggedIn: action.loggedIn };
    }
    case actions.SET_THEME: {
      console.log(action);
      return { ...state, theme: action.theme };
    }
    default:
      return state;
  }
};

const blogReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case blogActions.SET_POSTS: {
      return {
        ...state,
        posts: action.posts,
        activePost: action.activePost,
        loader: undefined,
        editingPost: undefined,
        loaded: true,
      };
    }
    case blogActions.SET_ACTIVE_POST: {
      return {
        ...state,
        activePost: action.title,
      };
    }
    case actions.ADDING_BLOG_POST: {
      return {
        ...state,
        addingPost: !state.addingPost,
        body: state.body && undefined,
        warning: state.addingPost && undefined,
        title: undefined,
        loader: "posting",
      };
    }
    case actions.IS_EDITING: {
      return { ...state, editingPost: action.id };
    }
    case blogActions.SET_DRAFT: {
      return { ...state, draft: action.draft };
    }
    case actions.IS_DELETING: {
      return { ...state, deletingPost: action.id };
    }
    case actions.DELETE_POST: {
      if (!state.posts) {
        return { ...state };
      }
      const i = state.posts?.findIndex((m) => m.id === action.id);
      return {
        ...state,
        posts: [...state.posts.slice(0, i), ...state.posts.slice(i + 1)],
      };
    }

    case actions.SET_WARNING: {
      return { ...state, warning: action.message };
    }
    case actions.SET_TITLE: {
      return { ...state, title: action.title };
    }
    case actions.SET_LOADER: {
      return { ...state, loader: action.action };
    }
    default:
      return state;
  }
};

export default combineReducers({ main: appReducer, blog: blogReducer });
