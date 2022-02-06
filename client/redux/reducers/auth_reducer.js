import { authAPI } from "../../axios/auth";
import { usersAPI } from "../../axios/users";
import { actionsAuth } from "../actions/auth_actions";

const initialState = {
  isAuth: false,
  userData: null,
  userId: null,
  profileData: null,
  error: null,
  message: null,
  showAlert: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/LOGIN":
      return {
        ...state,
        userData: action.payload,
        isAuth: true,
        showAlert: true,
      };
    case "auth/GET_ERROR":
      return {
        ...state,
        error: action.payload,
        showAlert: true,
      };
    case "auth/REGISTRATION":
      return {
        ...state,
        userData: action.payload,
        isAuth: true,
        showAlert: true,
      };
    case "auth/TOGGLE_INFO_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "auth/LOGOUT":
      return {
        ...state,
        isAuth: false,
        userData: null,
      };
    case "auth/REMOVE_MESSAGES": {
      return {
        ...state,
        error: null,
        message: null,
      };
    }
    case "auth/GET_USER": {
      return {
        ...state,
        userData: action.payload,
        userId: action.payload._id,
        isAuth: true,
      };
    }
    case "autn/TOGGLE_ALERT":
      return {
        ...state,
        showAlert: action.payload,
      };
    default:
      return state;
  }
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await usersAPI.getUserData(userId);
      if (status === 200) {
        dispatch(actionsAuth.getUser(data));
      }
    } catch (error) {
      dispatch(actionsAuth.toggleShowAlert(true));
      dispatch(actionsAuth.getError(error.response.data.message));
    }
  };
};

export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const { data, status } = await authAPI.login(email, password);
      if (status === 200) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Добро пожаловать!"));
        dispatch(actionsAuth.login(data));
        dispatch(getUser(data._id));
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Неверный логин или пароль"));
      } else {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage(error.response.data.message));
      }
    }
  };
};

export const userRegistration = (fullName, email, password) => {
  return async (dispatch) => {
    try {
      const { data, status } = await authAPI.registration(
        fullName,
        email,
        password
      );
      if (status === 201) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Вы зарегестрировались на сайте!"));
        dispatch(actionsAuth.registration(data));
        dispatch(getUser(data._id));
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(
          actionsAuth.toggleMessage(
            "Пользователь с такой почтой уже зарегистрирован"
          )
        );
      } else {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage(error.response.data.message));
      }
    }
  };
};

export const userLogout = () => {
  return (dispatch) => {
    try {
      dispatch(actionsAuth.logout());
      localStorage.clear();
    } catch (error) {
      dispatch(actionsAuth.getError(error.response.data.message));
    }
  };
};

export const checkUserAuth = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await authAPI.checkAuth();
      if (status === 200) {
        dispatch(getUser(data._id));
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Мы рады, что вы снова с нами!"));
      }
    } catch (error) {
      dispatch(actionsAuth.toggleShowAlert(true));
      dispatch(actionsAuth.toggleMessage("Вы не авторизованы"));
    }
  };
};

export const closeInfoAlert = () => {
  return (dispatch) => {
    dispatch(actionsAuth.toggleShowAlert(false));
  };
};

export const removeAlertMessages = () => {
  return (dispatch) => {
    dispatch(actionsAuth.removeMesages());
  };
};
