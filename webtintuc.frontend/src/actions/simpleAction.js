import { createAction } from "redux-actions";
import Cookies from "js-cookie";
export const getNewsestRequest = createAction("GET_NEWSEST_REQUEST");
export const getNewsestError = createAction("GET_NEWSEST_ERROR");
export const getNewsestSuccess = createAction("GET_NEWSEST_SUCCESS");
export const getNewsest = () => {
  return async (dispatch, getState) => {
    console.log("process.env.BACKEND_ADDRESS", process.env);
    dispatch(getNewsestRequest());
    fetch(`${process.env.REACT_APP_REST_API_LOCATION}/news/newsest`)
      .then(response => response.json())
      .then(data => dispatch(getNewsestSuccess(data)))
      .catch(error => dispatch(getNewsestError(error)));
  };
};

export const checkTokenRequest = createAction("CHECK_TOKEN_REQUEST");
export const checkTokenError = createAction("CHECK_TOKEN_ERROR");
export const checkTokenSuccess = createAction("CHECK_TOKEN_SUCCESS");
export const checkToken = () => {
  return async (dispatch, getState) => {
    dispatch(checkTokenRequest());
    let data;
    data = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/auth/checkactivetoken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`
      }
    });
    data = await data.json();
    if (data.success === false) {
      dispatch(checkTokenSuccess());
    }
  };
};

export const searchNewsRequest = createAction("SEARCH_NEWS_REQUEST");
export const searchNewsError = createAction("SEARCH_NEWS_ERROR");
export const searchNewsSuccess = createAction("SEARCH_NEWS_SUCCESS");
export const searchNews = (keyword, currentPage) => {
  return async (dispatch, getState) => {
    dispatch(searchNewsRequest());
    fetch(`${process.env.REACT_APP_REST_API_LOCATION}/news?q=${keyword}&currentPage=${currentPage}`)
      .then(response => response.json())
      .then(data => dispatch(searchNewsSuccess(data)))
      .catch(error => dispatch(searchNewsError(error)));
  };
};
