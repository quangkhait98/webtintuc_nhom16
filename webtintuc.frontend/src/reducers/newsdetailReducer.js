export default (
  state = {
    isProcessing: false,
    newsdetail: [],
    newsSameType: [],
    comments: [],
    newsId: null
  },
  action
) => {
  switch (action.type) {
    case "GET_NEWS_DETAIL_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "GET_NEWS_DETAIL_SUCCESS":
      return {
        ...state,
        newsdetail: action.payload,
        newsId: action.payload._id
      };
    case "GET_NEWS_SAME_TYPE_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "GET_NEWS_SAME_TYPE_SUCCESS":
      return {
        ...state,
        isProcessing: true,
        newsSameType: action.payload
      };
    case "GET_COMMENT_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "GET_COMMENT_SUCCESS":
      return {
        ...state,
        isProcessing: false,
        comments: action.payload
      };
      case "POST_COMMENT_REQUEST":
          return {
            ...state,
            isProcessing: true
          };
        case "POST_COMMENT_SUCCESS":
          return {
            ...state,
            isProcessing: false,
            comments: action.payload
          };
    default:
      return state;
  }
};
