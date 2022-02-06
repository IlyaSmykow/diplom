import { instance } from "./index";

export const postsAPI = {
  getAllPosts() {
    return instance.get("/posts");
  },
  getOnlyUsersPosts(userId) {
    return instance.get(`/posts?userId=${userId}`);
  },
  getPost(postId) {
    return instance.get(`posts/${postId}`);
  },
  createPost(data) {
    return instance.post("/posts", data);
  },
  editPost(id, data) {
    return instance.patch(`/posts/${id}`, data);
  },
  uploadImg(formData) {
    return instance.post("/posts/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deletePost(id) {
    return instance.delete(`/posts/${id}`);
  },
  getPage(page) {
    return instance.get(`/posts?page=${page}`);
  },
  search(query) {
    return instance.get(`/posts?query=${query}&limit=5`);
  },
};
