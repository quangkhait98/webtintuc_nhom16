import { createAction } from "redux-actions";

export const getNewsestByNewsTypeRequest = createAction(
  "GET_NEWSEST_NEWSTYPE_REQUEST"
);
export const getNewsestByNewsTypeError = createAction(
  "GET_NEWSEST_NEWSTYPE_ERROR"
);
export const getNewsestByNewsTypeSuccess = createAction(
  "GET_NEWSEST_NEWSTYPE_SUCCESS"
);
export const getNewsestByNewsType = newsTypeId => {
  return async (dispatch, getState) => {
    dispatch(getNewsestByNewsTypeRequest());
    fetch(`http://localhost:8001/news/tintubandoc`)
      .then(response => response.json())
      .then(data => dispatch(getNewsestByNewsTypeSuccess(data)))
      .catch(error => dispatch(getNewsestByNewsTypeError(error)));
  };
};
