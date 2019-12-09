import { createAction } from "redux-actions";
import _ from "lodash";
import { useImperativeHandle } from "react";
import Cookies from "js-cookie";

export const getNewsDetailRequest = createAction("GET_NEWS_DETAIL_REQUEST");
export const getNewsDetailError = createAction("GET_NEWS_DETAIL_ERROR");
export const getNewsDetailSuccess = createAction("GET_NEWS_DETAIL_SUCCESS");
export const getNewsDetail = newsId => {
  return async (dispatch, getState) => {
    dispatch(getNewsDetailRequest());
    const res = await fetch(`http://localhost:8001/news/${newsId}`)
      .then(response => response.json())
      .then(data => dispatch(getNewsDetailSuccess(data)))
      .catch(error => dispatch(getNewsDetailError(error)));
    if (res) {
      const news = _.get(res, "payload");
      await dispatch(getnewssametype(news._id, news.newsType));
      await dispatch(getComment(news._id));
    }
  };
};

export const getnewssametypeRequest = createAction(
  "GET_NEWS_SAME_TYPE_REQUEST"
);
export const getnewssametypeError = createAction("GET_NEWS_SAME_TYPE_ERROR");
export const getnewssametypeSuccess = createAction(
  "GET_NEWS_SAME_TYPE_SUCCESS"
);
export const getnewssametype = (newsId, newsTypeId) => {
  return async (dispatch, getState) => {
    dispatch(getnewssametypeRequest());
    fetch(
      `http://localhost:8001/news/${newsId}/getnewssametype?newsTypeId=${newsTypeId}`
    )
      .then(response => response.json())
      .then(data => dispatch(getnewssametypeSuccess(data)))
      .catch(error => dispatch(getnewssametypeError(error)));
  };
};

export const getCommentRequest = createAction("GET_COMMENT_REQUEST");
export const getCommentError = createAction("GET_COMMENT_ERROR");
export const getCommentSuccess = createAction("GET_COMMENT_SUCCESS");
export const getComment = newsId => {
  return async (dispatch, getState) => {
    dispatch(getCommentRequest());
    fetch(`http://localhost:8001/comment/${newsId}`)
      .then(response => response.json())
      .then(data => dispatch(getCommentSuccess(data)))
      .catch(error => dispatch(getCommentError(error)));
  };
};

export const postCommentRequest = createAction("POST_COMMENT_REQUEST");
export const postCommentError = createAction("POST_COMMENT_ERROR");
export const postCommentSuccess = createAction("POST_COMMENT_SUCCESS");
export const postComment = (newsId, content) => {
  return async (dispatch, getState) => {
    dispatch(postCommentRequest());
    const cmt = {
      newsId,
      content
    };
    fetch(`http://localhost:8001/comment/create`, {
      method: "POST",
      body: JSON.stringify(cmt),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => response.json())
      .then(data => dispatch(postCommentSuccess(data)))
      .catch(error => dispatch(postCommentError(error)));
  };
};
