import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";
import { setAlert } from "./alert";

export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "warning"));
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const updateProfile = newProfile => async dispatch => {
  dispatch({
    type: UPDATE_PROFILE,
    payload: newProfile
  });
};
