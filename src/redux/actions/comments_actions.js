export const actionsComments = {
  createComment: (payload) => ({ type: "comments/CREATE_COMMENT", payload }),
  addComment: (payload) => ({ type: "comments/ADD_COMMENT", payload }),
  getComments: (payload) => ({ type: "comments/GET_COMMENTS", payload }),
  getUsersComments: (payload) => ({
    type: "comments/GET_USER_COMMENTS",
    payload,
  }),
  getComment: (payload) => ({ type: "comments/GET_COMMENT", payload }),
  editComment: (payload) => ({ type: "comments/EDIT_COMMENT", payload }),
  getError: (payload) => ({ type: "comments/GET_ERROR", payload }),
  toggleMessage: (payload) => ({
    type: "comments/TOGGLE_INFO_MESSAGE",
    payload,
  }),
  toggleStatus: (payload) => ({ type: "comments/TOGGLE_STATUS", payload }),
  toggleLoading: (payload) => ({ type: "comments/TOGGLE_LOADING", payload }),
};
