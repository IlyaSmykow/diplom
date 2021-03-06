import { commentsAPI } from "../../axios/comments";
import { actionsComments } from "../actions/comments_actions";

const initialState = {
  comments: [],
  commentData: null,
  usersCommentsData: [],
  error: null,
  message: null,
  statusCode: null,
  isLoading: false,
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "comments/GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "comments/CREATE_COMMENT":
      return {
        ...state,
        commentData: action.payload,
      };
    case "comments/TOGGLE_STATUS":
      return {
        ...state,
        statusCode: action.payload,
      };
    case "comments/GET_USER_COMMENTS":
      return {
        ...state,
        usersCommentsData: action.payload,
      };
    case "comments/TOGGLE_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const getAllCommentsOfPost = (postId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await commentsAPI.allCommentsForPost(postId);
      if (status === 200) {
        dispatch(actionsComments.getComments(data));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await commentsAPI.getAllComments();
      if (status === 200) {
        dispatch(actionsComments.getComments(data));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const uploadComment = (comment, postId) => {
  return async (dispatch) => {
    try {
      dispatch(actionsComments.toggleLoading(true));
      const { status } = await commentsAPI.createComment(comment);
      if (status === 201) {
        dispatch(actionsComments.toggleMessage("???????????? ??????????????????"));
        dispatch(getAllCommentsOfPost(postId));
        dispatch(actionsComments.toggleLoading(false));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    } finally {
      dispatch(actionsComments.toggleLoading(false));
    }
  };
};

export const getOnlyUsersComments = (userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await commentsAPI.getOnlyUsersComments(userId);
      if (status === 200) {
        dispatch(actionsComments.getUsersComments(data));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const editComment = (id, text, postId, userId) => {
  return async (dispatch) => {
    try {
      dispatch(actionsComments.toggleLoading(true));
      const { status } = await commentsAPI.editComment(id, text);
      if (status === 202) {
        dispatch(getAllCommentsOfPost(postId));
        dispatch(getOnlyUsersComments(userId));
        dispatch(actionsComments.toggleLoading(false));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    } finally {
      dispatch(actionsComments.toggleLoading(false));
    }
  };
};

export const deleteComment = (id, postId, userId) => {
  return async (dispatch) => {
    try {
      const { status } = await commentsAPI.deleteComment(id);
      if (status === 202) {
        dispatch(getAllCommentsOfPost(postId));
        dispatch(getOnlyUsersComments(userId));
      } else if (status === 403) {
        dispatch(
          actionsComments.toggleMessage("?? ?????? ?????? ?????????????? ?? ???????? ????????????")
        );
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};
