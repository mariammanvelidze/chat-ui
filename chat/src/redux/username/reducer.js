import { SET_USERNAME } from "./actionTypes";
import { v4 } from "node-uuid";

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        // ...state,
        id: v4(),
        username: action.username,
      };
    default:
      return state;
  }
};
