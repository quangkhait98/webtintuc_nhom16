import { get } from "lodash";
export default (
  state = {
    isProcessing: false,
    newsest: [],
    isExpied: undefined,
    newsSearch: [],
    keyword: null,
    currentPage: 1,
    totalPage: 0
  },
  action
) => {
  switch (action.type) {
    case "GET_NEWSEST_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "GET_NEWSEST_SUCCESS":
      return {
        ...state,
        isProcessing: false,
        newsest: action.payload
      };
    case "CHECK_TOKEN_SUCCESS":
      return {
        ...state,
        isExpied: true
      };
    case "SEARCH_NEWS_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "SEARCH_NEWS_SUCCESS":
      return {
        ...state,
        isProcessing: false,
        keyword: get(action, "payload.keyword"),
        newsSearch: get(action, "payload.news"),
        currentPage: get(action, "payload.currentPage"),
        totalPage: get(action, "payload.totalPage")
      };
    case "SEARCH_NEWS_ERROR":
      return {
        ...state
      };
    default:
      return state;
  }
};
