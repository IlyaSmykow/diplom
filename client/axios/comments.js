import { instance } from "./index";

export const commentsAPI = {
  getAllComments() {
    return instance.get("/comments");
  },
  getOnlyUsersComments(userId) {
    return instance.get(`/comments?userId=${userId}`);
  },
  allCommentsForPost(postId) {
    return instance.get(`/comments/post/${postId}`);
  },
  createComment(data) {
    return instance.post("/comments", data);
  },
  editComment(id, text) {
    return instance.patch(`/comments/${id}`, {
      text,
    });
  },
  deleteComment(id) {
    return instance.delete(`/comments/${id}`);
  },
};
