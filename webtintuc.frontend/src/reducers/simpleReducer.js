export default (
  state = { isProcessing: false, newsest: [], isExpied: undefined },
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
    default:
      return state;
  }
};
