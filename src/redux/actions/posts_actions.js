export const actionsPosts = {
  createOnePost: (payload) => ({ type: "posts/CREATE_POST", payload }),
  getPosts: (payload) => ({ type: "posts/GET_POSTS", payload }),
  getPost: (payload) => ({ type: "posts/GET_POST", payload }),
  getTotalPostsNumber: (payload) => ({
    type: "posts/GET_TOTAL_NUMBER",
    payload,
  }),
  getError: (payload) => ({ type: "posts/GET_ERROR", payload }),
  toggleMessage: (payload) => ({ type: "posts/TOGGLE_INFO_MESSAGE", payload }),
  uploadImg: (payload) => ({ type: "posts/UPLOAD_IMAGE", payload }),
  changePage: (payload) => ({ type: "posts/TOGGLE_PAGE", payload }),
  getResponse: (payload) => ({ type: "posts/GET_RESPONSE", payload }),
  getUsersPosts: (payload) => ({ type: "posts/GET_USERS_POSTS", payload }),
  toggleLoading: (payload) => ({ type: "posts/TOGGLE_LOADING", payload }),
};
