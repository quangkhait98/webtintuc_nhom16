export default (state = { isProcessing: false, myNews: [] }, action) => {
  switch (action.type) {
    case "GET_MY_NEWS_REQUEST":
        console.log("abc");
      return {
        ...state,
        isProcessing: true
      };
    case "GET_MY_NEWS_SUCCESS":
      console.log("abc", action.payload);
      return {
        ...state,
        isProcessing: false,
        myNews: action.payload
      };
    default:
      return state;
  }
};
