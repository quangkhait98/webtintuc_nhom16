import { createAction } from "redux-actions";

export const getNewsByNewsTypeRequest = createAction(
  "GET_NEWS_NEWSTYPE_REQUEST"
);
export const getNewsByNewsTypeError = createAction("GET_NEWS_NEWSTYPE_ERROR");
export const getNewsByNewsTypeSuccess = createAction(
  "GET_NEWS_NEWSTYPE_SUCCESS"
);
export const getNewsByNewsType = (newsTypeId, currentPage) => {
  return async (dispatch, getState) => {
    dispatch(getNewsByNewsTypeRequest());
    fetch(
      `${process.env.REACT_APP_REST_API_LOCATION}/news/newsbynewstype?newsTypeId=${newsTypeId}&currentPage=${currentPage}`,
    )
      .then(response => response.json())
      .then(data => dispatch(getNewsByNewsTypeSuccess(data)))
      .catch(error => dispatch(getNewsByNewsTypeError(error)));
  };
};
