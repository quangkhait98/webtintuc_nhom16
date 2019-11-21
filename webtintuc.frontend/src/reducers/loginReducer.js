import Cookies from "js-cookie";
import _ from "lodash";
export default (
  state = {
    isAuthenticated: Cookies.get("isAuthenticated") === "true" ? true : false,
    token: Cookies.get("token"),
    user: _.isUndefined(Cookies.get("user"))
      ? null
      : JSON.parse(Cookies.get("user").slice(2, Cookies.get("user").length)),
    isProcessing: undefined
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_FACEBOOK_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "LOGIN_FACEBOOK_SUCCESS":
      const token = Cookies.get("token");
      return {
        ...state,
        isProcessing: false,
        token,
        isAuthenticated: true
      };
    default:
      return state;
  }
};
