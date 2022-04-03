import { createStore } from "redux";
import RootReducer from "./reducers";
export * from "./reducers";

const store = createStore(RootReducer);
export type RootState = ReturnType<typeof RootReducer>;

export default store;
