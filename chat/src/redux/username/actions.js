import { SET_USERNAME } from "./actionTypes";

export const setUsername = (username = "") => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};
