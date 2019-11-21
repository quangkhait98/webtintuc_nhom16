export default (state = { isProcessing: false, newsByNewsType: [] }, action) => {
    switch (action.type) {
      case "GET_NEWSEST_NEWSTYPE_REQUEST":
        return {
          ...state,
          isProcessing: true
        };
      case "GET_NEWSEST_NEWSTYPE_SUCCESS":
        return {
          ...state,
          isProcessing: false,
          newsByNewsType: action.payload
        };
      default:
        return state;
    }
  };
  