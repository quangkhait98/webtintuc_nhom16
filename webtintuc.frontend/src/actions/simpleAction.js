import { createAction } from "redux-actions";

export const getNewsestRequest = createAction("GET_NEWSEST_REQUEST");
export const getNewsestError = createAction("GET_NEWSEST_ERROR");
export const getNewsestSuccess = createAction("GET_NEWSEST_SUCCESS");
export const getNewsest = () => {
  return async (dispatch, getState) => {
    dispatch(getNewsestRequest());
    fetch("http://localhost:8001/news/newsest")
      .then(response => response.json())
      .then(data => dispatch(getNewsestSuccess(data)))
      .catch(error => dispatch(getNewsestError(error)));
  };
};
