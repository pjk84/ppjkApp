import { Post, Tag } from "../components/blog/types";
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

type IblogState = {
  addingPost?: boolean;
  activePost?: Post;
  posts: Array<Post>;
  focussedPost?: Post;
  editingPost?: boolean;
  deletingPost?: boolean;
  title?: string;
  warning?: string;
  isPosting?: boolean;
  loader?: string;
  body?: string;
  loaded?: boolean;
  draft?: Post;
  addedTags: Array<string>;
  reload: boolean;
  selectedTags: Array<string>;
};

const initialState: Istate & IblogState = {
  reload: true,
  active: [],
  posts: [],
  auth: {
    loggedIn: false,
  },
  addedTags: [],
  selectedTags: [],
  showSideBar: false,
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

const blogReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case blogActions.SET_POSTS: {
      return {
        ...state,
        posts: action.posts,
        loader: undefined,
        editingPost: undefined,
        loaded: true,
        draft: undefined,
        deletingPost: undefined,
        focussedPost: undefined,
        reload: false,
        warning: undefined,
        selectedTags: [],
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
    case blogActions.FOCUS_POST: {
      return { ...state, reload: true, focussedPost: action.post };
    }
    case blogActions.RELOAD_REQUIRED: {
      return {
        ...state,
        reload: true,
      };
    }
    case actions.IS_EDITING: {
      return { ...state, editingPost: !state.editingPost };
    }
    case blogActions.DELETE_POST: {
      return {
        ...state,
        deletingPost: false,
        posts: state.posts.filter((p) => p.id !== action.id),
      };
    }
    case blogActions.SET_DRAFT: {
      if (action.draft === null) {
        return { ...state, draft: null };
      }
      if (!state.draft) {
        return { ...state, draft: action.draft };
      }
      return { ...state, draft: { ...state.draft, ...action.draft } };
    }
    case blogActions.IS_DELETING: {
      return { ...state, deletingPost: !state.deletingPost };
    }
    case blogActions.RESET_POST: {
      return {
        ...state,
        addedTags: [],
        draft: undefined,
        editingPost: undefined,
        deletingPost: undefined,
      };
    }
    case blogActions.REMOVE_TAG: {
      return {
        ...state,
        addedTags: state.addedTags.filter((t) => t !== action.tag),
      };
    }
    case blogActions.SET_SELECTED_TAGS: {
      return { ...state, selectedTags: action.tags };
    }
    case actions.SET_WARNING: {
      return { ...state, warning: action.message };
    }
    case actions.SET_LOADER: {
      return { ...state, loader: action.action };
    }
    default:
      return state;
  }
};

export default combineReducers({ main: appReducer, blog: blogReducer });
