export default (state = { isProcessing: false, newsest: [] }, action) => {
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
    default:
      return state;
  }
};
