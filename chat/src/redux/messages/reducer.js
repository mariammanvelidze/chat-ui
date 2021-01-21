import { SEND_MESSAGE, RECEIVE_MESSAGE } from "./actionTypes";
import { v4 } from "node-uuid";
const initialMessageState = {
  arr: [],
};
export const messageReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        arr: [
          ...(state.arr || []),
          {
            id: v4(),
            from: action.payload.from,
            message: action.payload.message,
          },
        ],
      };
    // case RECEIVE_MESSAGE:
    //   return state.concat([
    //     {
    //       id: v4(),
    //       from: action.payload.from,
    //       message: action.payload.message,
    //       time: new Date().toISOString(),
    //     },
    //   ]);

    default:
      return state;
  }
};
