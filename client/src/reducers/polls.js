import {
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLL_SUCCESS,
  GET_POLL_FAILURE,
  CLEAR_POLL,
  VOTE_POLL_SUCCESS,
  VOTE_POLL_FAILURE
} from "../actions/types";

const initialState = {
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
    case GET_POLL_SUCCESS:
      return {
        ...state,
        poll: payload,
        isLoading: false
      };
    case GET_POLLS_FAILURE:
    case GET_POLL_FAILURE:
    case VOTE_POLL_FAILURE:
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
    case CLEAR_POLL:
      return {
        ...state,
        poll: null
      };
    default:
      return state;
  }
}
