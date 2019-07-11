import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import alert from "./alert";
import profile from "./profile";
import polls from "./polls";

export default combineReducers({
  auth,
  alert,
  profile,
  polls,
  form: formReducer
});
