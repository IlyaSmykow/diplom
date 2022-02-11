import { instance } from "./index";

export const usersAPI = {
  allUsers() {
    return instance.get("/users");
  },
  getUserData(id) {
    return instance.get(`/users/${id}`);
  },
};
