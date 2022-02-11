import styles from "./UserProfilePage.module.scss";
import { useEffect } from "react";
import { Post } from "../../components/Post/Post";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/selectors/authSelectors";
import { getOnlyUsersPosts } from "../../redux/reducers/posts_reducer";
import { getOnlyUsersComments } from "../../redux/reducers/comments_reducer";
import { getUserPosts } from "../../redux/selectors/postsSelectors";
import { getUsersComments } from "../../redux/selectors/commentsSelector";
import { formatDate } from "../../utils/formatDate";
import { Comment } from "../../components/Comment/Comment";

export const UserProfilePage = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const data = useSelector(getUserData);
  const userId = data._id;
  const postsData = useSelector(getUserPosts);
  const commentsData = useSelector(getUsersComments);

  useEffect(() => {
    dispatch(getOnlyUsersPosts(userId));
    dispatch(getOnlyUsersComments(userId));
  }, [userId, dispatch]);

  return (
    <>
      {data && (
        <div className={styles.profile__wrapper}>
          <h1>{data.fullName}</h1>
          <label>{data.fullName.split(" ")[0]} blog</label>
          <div className={styles.profile__time}>
            Дата регистрации: <time>{formatDate(data.createdAt)}</time>
          </div>
          <div className={styles.profile__tabs}>
            <button onClick={() => setActive(true)}>Статьи</button>
            <button onClick={() => setActive(false)}>Комментарии</button>
          </div>
          {active ? (
            <div className={styles.posts__wrapper}>
              {postsData.length > 0 ? (
                postsData.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    text={post.text}
                    views={post.views}
                    createdAt={post.createdAt}
                    img={post.photoUrl}
                  />
                ))
              ) : (
                <div>нет данных</div>
              )}
            </div>
          ) : (
            <div className={styles.profile__comments_wrapper}>
              {commentsData.items.length > 0 ? (
                commentsData.items.map((comment) => (
                  <Comment
                    key={comment._id}
                    id={comment._id}
                    text={comment.text}
                    updatedAt={comment.updatedAt}
                    userName={comment.user.fullName}
                    userId={userId}
                  />
                ))
              ) : (
                <div>нет данных</div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
