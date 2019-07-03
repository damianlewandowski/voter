import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import alert from "./alert";

export default combineReducers({
  auth,
  alert,
  form: formReducer
});
