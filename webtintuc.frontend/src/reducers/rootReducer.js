import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import columnleftReducer from "./columnleftReducer";
import columnrightReducer from "./columnrightReducer";
import menuReducer from "./menuReducer";
import footerReducer from "./footerReducer";
import newsdetailReducer from "./newsdetailReducer";
import newstypeReducer from "./newstypeReducer";
import homepageReducer from "./homepageReducer";
import loginReducer from "./loginReducer";
export default combineReducers({
  simpleReducer,
  columnleftReducer,
  columnrightReducer,
  menuReducer,
  footerReducer,
  newsdetailReducer,
  newstypeReducer,
  homepageReducer,
  loginReducer
});
