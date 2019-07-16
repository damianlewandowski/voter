import {
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLL_SUCCESS,
  GET_POLL_FAILURE,
  CLEAR_POLL,
  VOTE_POLL_SUCCESS,
  VOTE_POLL_FAILURE,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE,
  GET_PRIVATE_POLLS_SUCCESS,
  GET_PRIVATE_POLLS_FAILURE
} from "../actions/types";

const initialState = {
  privatePolls: [],
  polls: [],
  poll: null,
  error: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POLLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        polls: payload
      };
    case GET_PRIVATE_POLLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        privatePolls: payload
      };
    case GET_POLL_SUCCESS:
      return {
        ...state,
        poll: payload,
        isLoading: false
      };
    case GET_POLLS_FAILURE:
    case GET_POLL_FAILURE:
    case GET_PRIVATE_POLLS_FAILURE:
    case VOTE_POLL_FAILURE:
    case DELETE_POLL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    case VOTE_POLL_SUCCESS: {
      return {
        ...state,
        poll: {
          ...state.poll,
          options: payload.options
        },
        isLoading: false
      };
    }
    case DELETE_POLL_SUCCESS:
      return {
        ...state,
        polls: state.polls.filter(p => p._id !== payload),
        poll: null
      };
    case CLEAR_POLL:
      return {
        ...state,
        poll: null
      };
    default:
      return state;
  }
}
