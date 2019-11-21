export default (state = { isProcessing: false, newsByCategory: [] }, action) => {
    switch (action.type) {
      case "GET_NEWS_BY_CATEGORY_REQUEST":
        return {
          ...state,
          isProcessing: true
        };
      case "GET_NEWS_BY_CATEGORY_SUCCESS":
        return {
          ...state,
          isProcessing: false,
          newsByCategory: action.payload
        };
      default:
        return state;
    }
  };
  