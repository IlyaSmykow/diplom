import styles from "./CommentsBlock.module.scss";
import { useEffect } from "react";
import { Comment } from "../Comment/Comment";
import { CreateCommentForm } from "../../forms/CreateComment/CreateCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentsOfPost } from "../../redux/reducers/comments_reducer";
import { getAllComments } from "../../redux/selectors/commentsSelector";

export const CommentsBlock = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(getAllComments);

  useEffect(() => {
    dispatch(getAllCommentsOfPost(postId));
  }, [postId, dispatch]);

  return (
    <div className={styles.comments__wrapper}>
      <h2>Комментарии ({comments.length})</h2>
      <div className={styles.comments__list}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              id={comment._id}
              text={comment.text}
              updatedAt={comment.updatedAt}
              userName={comment.user.fullName}
              postId={postId}
              userId={comment.user._id}
            />
          ))
        ) : (
          <p>Комментарии отсутствуют</p>
        )}
      </div>
      <div>
        <CreateCommentForm postId={postId} />
      </div>
    </div>
  );
};
