import { createAction } from "redux-actions";

export const getNewsViewMostRequest = createAction(
  "GET_NEWS_VIEW_MOST_REQUEST"
);
export const getNewsViewMostError = createAction("GET_NEWS_VIEW_MOST_ERROR");
export const getNewsViewMostSuccess = createAction(
  "GET_NEWS_VIEW_MOST_SUCCESS"
);
export const getNewsViewMost = () => async dispatch => {
  dispatch(getNewsViewMostRequest());
  fetch(`${process.env.REACT_APP_REST_API_LOCATION}/news/newsviewmost`)
    .then(response => response.json())
    .then(data => dispatch(getNewsViewMostSuccess(data)))
    .catch(error => dispatch(getNewsViewMostError(error)));
};
