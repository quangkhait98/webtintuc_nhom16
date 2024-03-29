import { createAction } from "redux-actions";

export const getCategoryRequest = createAction("GET_CATEGORY_REQUEST");
export const getCategoryError = createAction("GET_CATEGORY_ERROR");
export const getCategorySuccess = createAction("GET_CATEGORY_SUCCESS");
export const getCategory = () => {
  return async (dispatch, getState) => {
    dispatch(getCategoryRequest());
    await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/category`)
      .then(response => response.json())
      .then(data => dispatch(getCategorySuccess(data)))
      .catch(error => dispatch(getCategoryError(error)));
  };
};
