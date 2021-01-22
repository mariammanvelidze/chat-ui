import { ADD_USER } from "./actionTypes";
import { v4 } from "node-uuid";

let initialUserState = {
  users: [],
};
export const addUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        arr: [
          ...(state.arr || []),
          {
            id: v4(),
            username: action.payload.username,
          },
        ],
      };
    default:
      return state;
  }
};
