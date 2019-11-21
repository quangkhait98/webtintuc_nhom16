import { createAction } from "redux-actions";

export const getNewsByCategoryRequest = createAction("GET_NEWS_BY_CATEGORY_REQUEST");
export const getNewsByCategoryError = createAction("GET_NEWS_BY_CATEGORY_ERROR");
export const getNewsByCategorySuccess = createAction("GET_NEWS_BY_CATEGORY_SUCCESS");
export const getNewsByCategory = () => {
  return async (dispatch, getState) => {
    dispatch(getNewsByCategoryRequest());
    fetch(`http://localhost:8001/category/getnewsestbycategory`)
      .then(response => response.json())
      .then(data => dispatch(getNewsByCategorySuccess(data)))
      .catch(error => dispatch(getNewsByCategoryError(error)));
  };
};
