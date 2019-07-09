import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  error: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        isLoading: false,
        profile: payload
      };
    case PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
