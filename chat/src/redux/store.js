import { createStore, combineReducers } from "redux";
import { userReducer } from "./username/reducer";
import { messageReducer } from "./messages/reducer";

import { loadState, saveState } from "./localStorage.js";

const persistedState = loadState();
const rootReducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
});

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;
