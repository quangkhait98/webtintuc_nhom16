import { createAction } from "redux-actions";
import Cookies from "js-cookie";
export const getMyNewsRequest = createAction("GET_MY_NEWS_REQUEST");
export const getMyNewsError = createAction("GET_MY_NEWS_ERROR");
export const getMyNewsSuccess = createAction("GET_MY_NEWS_SUCCESS");
export const getMyNews = () => {
  return async (dispatch, getState) => {
    dispatch(getMyNewsRequest());
    fetch(`${process.env.REACT_APP_REST_API_LOCATION}/user/getnewsbyuserid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => response.json())
      .then(data => dispatch(getMyNewsSuccess(data)))
      .catch(error => dispatch(getMyNewsError(error)));
  };
};

export const editNewsRequest = createAction("EDIT_NEWS_REQUEST");
export const editNewsError = createAction("EDIT_NEWS_ERROR");
export const editNewsSuccess = createAction("EDIT_NEWS_SUCCESS");
export const editNews = (newsId, news) => {
  return async (dispatch, getState) => {
    dispatch(editNewsRequest());
    fetch(`${process.env.REACT_APP_REST_API_LOCATION}/news/${newsId}/update`, {
      method: "PUT",
      body: JSON.stringify(news),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => response.json())
      .then(data => dispatch(getMyNews()))
      .catch(error => console.log("error"));
  };
};

export const deleteNewsRequest = createAction("DELETE_NEWS_REQUEST");
export const deleteNewsError = createAction("DELETE_NEWS_ERROR");
export const deleteNewsSuccess = createAction("DELETE_NEWS_SUCCESS");
export const deleteNews = newsId => {
  return async (dispatch, getState) => {
    dispatch(deleteNewsRequest());
    fetch(`${process.env.REACT_APP_REST_API_LOCATION}/news/${newsId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => response.json())
      .then(data => dispatch(getMyNews()))
      .catch(error => console.log("error"));
  };
};

export const postNewsRequest = createAction("POST_NEWS_REQUEST");
export const postNewsError = createAction("POST_NEWS_ERROR");
export const postNewsSuccess = createAction("POST_NEWS_SUCCESS");
export const postNews = news => {
  return async (dispatch, getState) => {
    dispatch(deleteNewsRequest());
    fetch(`${process.env.REACT_APP_REST_API_LOCATION}/news/create`, {
      method: "POST",
      body: JSON.stringify(news),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => response.json())
      .then(data => dispatch(getMyNews()))
      .catch(error => console.log("error"));
  };
};
