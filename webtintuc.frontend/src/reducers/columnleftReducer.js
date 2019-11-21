export default (state = { isProcessing: false, newsViewMost: [] }, action) => {
    switch (action.type) {
      case "GET_NEWS_VIEW_MOST_REQUEST":
        return {
          ...state,
          isProcessing: true
        };
      case "GET_NEWS_VIEW_MOST_SUCCESS":
        return {
          ...state,
          isProcessing: false,
          newsViewMost: action.payload
        };
      default:
        return state;
    }
  };
  