import { combineReducers } from "redux";
import coinDetailReducer from "./coinDetailReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
  coinDetailReducer,
  pageReducer,
});
