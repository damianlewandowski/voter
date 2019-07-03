import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_SUCCESS,
  LOGOUT,
  LOAD_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false
      };
    case LOGIN_FAILURE:
    case LOAD_USER_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...payload
        },
        isAuthenticated: true,
        isLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
