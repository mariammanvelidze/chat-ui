import { ADD_USER } from "./actionTypes";

export const setUsername = (username = "") => {
  return {
    type: ADD_USER,
    payload: username,
  };
};
