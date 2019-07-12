import axios from "axios";
import {
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLL_SUCCESS,
  GET_POLL_FAILURE,
  CLEAR_POLL,
  VOTE_POLL_SUCCESS,
  VOTE_POLL_FAILURE,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE
} from "./types";
import { setAlert } from "./alert";

export const getPolls = () => async dispatch => {
  try {
    const res = await axios.get("/api/polls");

    dispatch({
      type: GET_POLLS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_POLLS_FAILURE
    });

    dispatch(
      setAlert(
        "Could not fetch polls from the server. Try again later.",
        "error"
      )
    );
  }
};

export const getPoll = id => async (dispatch, getState) => {
  // Prevent unnecesary api calls
  const poll = getState().polls.polls.find(p => p.id === id);
  if (poll) {
    dispatch({
      type: GET_POLL_SUCCESS,
      payload: poll
    });
    return;
  }

  try {
    const res = await axios.get(`/api/polls/${id}`);

    dispatch({
      type: GET_POLL_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_POLL_FAILURE
    });

    dispatch(
      setAlert(
        "Could not fetch poll from the server. Try again later.",
        "error"
      )
    );
  }
};

export const clearPoll = () => dispatch => {
  dispatch({
    type: CLEAR_POLL
  });
};

export const vote = (pollId, optionName) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ optionName });

  try {
    const res = await axios.post(`/api/polls/vote/${pollId}`, body, config);

    dispatch({
      type: VOTE_POLL_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VOTE_POLL_FAILURE,
      payload: err.response
    });
  }
};

export const deletePoll = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/polls/${id}`);
    console.log(res);

    dispatch({
      type: DELETE_POLL_SUCCESS
    });

    history.push("/");
  } catch (err) {
    dispatch({
      type: DELETE_POLL_FAILURE,
      payload: err.res.data.msg
    });
  }
};
