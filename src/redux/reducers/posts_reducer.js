import { postsAPI } from "../../axios/posts";
import { actionsPosts } from "../actions/posts_actions";

const initialState = {
  postsData: [],
  postData: null,
  usersPostsData: [],
  error: null,
  message: null,
  images: [],
  totalPostsNumber: 0,
  searchResponseData: [],
  isLoading: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "posts/GET_POSTS":
      return {
        ...state,
        postsData: action.payload,
      };
    case "posts/CREATE_POST":
      return {
        ...state,
        postData: action.payload,
      };
    case "posts/GET_TOTAL_NUMBER":
      return {
        ...state,
        totalPostsNumber: action.payload,
      };
    case "posts/GET_POST":
      return {
        ...state,
        postData: action.payload,
      };
    case "posts/GET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "posts/TOGGLE_INFO_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "posts/TOGGLE_PAGE":
      return {
        ...state,
        postsData: action.payload.items,
      };
    case "posts/GET_RESPONSE":
      return {
        ...state,
        searchResponseData: action.payload,
      };
    case "posts/GET_USERS_POSTS":
      return {
        ...state,
        usersPostsData: action.payload,
      };
    case "posts/TOGGLE_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.getAllPosts();
      if (status === 200) {
        dispatch(actionsPosts.getPosts(data.items));
        dispatch(actionsPosts.getTotalPostsNumber(data.total));
      }
    } catch (error) {
      dispatch(actionsPosts.getError("Произошла ошибка"));
    }
  };
};

export const getPost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(actionsPosts.toggleLoading(true));
      const { data, status } = await postsAPI.getPost(postId);
      if (status === 200) {
        dispatch(actionsPosts.getPost(data));
        dispatch(actionsPosts.toggleLoading(false));
      }
    } catch (error) {
      dispatch(actionsPosts.getError("Произошла ошибка"));
    } finally {
      dispatch(actionsPosts.toggleLoading(false));
    }
  };
};

export const uploadPost = (post) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.createPost(post);
      if (status === 201) {
        dispatch(actionsPosts.toggleMessage("Запись добавлена"));
        dispatch(actionsPosts.createOnePost(data));
        dispatch(getAllPosts());
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const uploadImage = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(actionsPosts.toggleLoading(true));
      const { data, status } = await postsAPI.uploadImg(formData);
      if (status === 200) {
        return data;
      }
      dispatch(actionsPosts.toggleLoading(false));
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    } finally {
      dispatch(actionsPosts.toggleLoading(false));
    }
  };
};

export const togglePage = (pageNumber) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.getPage(pageNumber);
      if (status === 200) {
        dispatch(actionsPosts.changePage(data));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const searchPost = (query) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.search(query);
      if (status === 200) {
        dispatch(actionsPosts.getPosts(data.items));
        dispatch(actionsPosts.getResponse(data));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const getOnlyUsersPosts = (userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.getOnlyUsersPosts(userId);
      if (status === 200) {
        dispatch(actionsPosts.getUsersPosts(data.items));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const { status } = await postsAPI.deletePost(postId);
      if (status === 202) {
        dispatch(getAllPosts());
        dispatch(actionsPosts.toggleMessage("Запись удалена"));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const editPost = (id, data) => {
  return async (dispatch) => {
    try {
      const { status } = await postsAPI.editPost(id, data);
      if (status === 202) {
        dispatch(getPost(id));
        dispatch(getAllPosts());
        dispatch(actionsPosts.toggleMessage("Запись обновлена"));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const toggleMessage = (message) => {
  return async (dispatch) => {
    dispatch(actionsPosts.toggleMessage(message));
  };
};
