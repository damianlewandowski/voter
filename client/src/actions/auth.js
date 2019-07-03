import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT
} from "./types";
import { setAlert } from "./alert";

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAILURE
    });
  }
};

export const logout = () => async dispatch => {
  const success = axios.get("/api/auth/logout");
  if (success) {
    dispatch({
      type: LOGOUT
    });
    dispatch(setAlert("You've been succesfully logged out.", "success"));
  } else {
    dispatch(setAlert("Something went wrong during logout.", "error"));
  }
};
