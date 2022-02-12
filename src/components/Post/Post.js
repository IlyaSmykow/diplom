import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { deletePost } from "../../redux/reducers/posts_reducer";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/authSelectors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Post = ({ id, title, text, createdAt, views, img, userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const idUserOwnerPost = userData && userData._id;
  const date = formatDate(createdAt);

  const showPost = (id) => {
    navigate(`/posts/${id}`);
  };

  const removePost = () => {
    if (window.confirm("Удалить запись?")) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className={styles.post__wrapper}>
      <div className={styles.post__info}>
        <div className={styles.post__title} onClick={() => showPost(id)}>
          {title}
        </div>
        <p>{text}</p>
        <div className={styles.post__footer}>
          <span>{date}</span>
          <div className={styles.post__footer_counter}>
            <RemoveRedEyeIcon />
            <span>{views}</span>
          </div>
        </div>
      </div>
      {img && (
        <div className={styles.post__image}>
          <img src={`build${img}`} alt="some_image" />
        </div>
      )}
      <div className={styles.edit__post_icons}>
        {idUserOwnerPost === userId && (
          <div onClick={removePost}>
            <DeleteForeverIcon />
          </div>
        )}
      </div>
    </div>
  );
};
