export default (
  state = {
    isProcessing: false,
    newsByNewsType: [],
    totalPage: 0,
    currentPage: 1
  },
  action
) => {
  switch (action.type) {
    case "GET_NEWS_NEWSTYPE_REQUEST":
      return {
        ...state,
        isProcessing: true
      };
    case "GET_NEWS_NEWSTYPE_SUCCESS":
      return {
        ...state,
        isProcessing: false,
        newsByNewsType: action.payload.news,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage
      };
    default:
      return state;
  }
};
