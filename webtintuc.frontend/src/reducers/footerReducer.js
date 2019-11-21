export default (state = { isProcessing: false, categories: [] }, action) => {
    switch (action.type) {
      case "GET_CATEGORY_REQUEST":
        return {
          ...state,
          isProcessing: true
        };
      case "GET_CATEGORY_SUCCESS":
        return {
          ...state,
          isProcessing: false,
          categories: action.payload
        };
      default:
        return state;
    }
  };
  