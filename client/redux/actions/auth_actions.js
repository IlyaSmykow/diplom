export const actionsAuth = {
  login: (payload) => ({ type: "auth/LOGIN", payload }),
  logout: () => ({ type: "auth/LOGOUT" }),
  registration: (payload) => ({ type: "auth/REGISTRATION", payload }),
  getError: (payload) => ({ type: "auth/GET_ERROR", payload }),
  toggleMessage: (payload) => ({ type: "auth/TOGGLE_INFO_MESSAGE", payload }),
  removeMesages: () => ({ type: "auth/REMOVE_MESSAGES" }),
  getUser: (payload) => ({ type: "auth/GET_USER", payload }),
  toggleShowAlert: (payload) => ({ type: "autn/TOGGLE_ALERT", payload }),
};
