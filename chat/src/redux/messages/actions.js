import { SEND_MESSAGE, RECEIVE_MESSAGE } from "./actionTypes";

export const sendMessage = (from, message) => {
  return {
    type: SEND_MESSAGE,
    payload: {
      from,
      message,
    },
  };
};

export const receiveMessage = (from, message) => {
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      from,
      message,
    },
  };
};
