import styles from "./Comment.module.scss";
import { authAPI } from "../../axios/auth";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/authSelectors";
import {
  deleteComment,
  editComment,
} from "../../redux/reducers/comments_reducer";
import { useLocation } from "react-router-dom";

export const Comment = ({ id, text, updatedAt, userName, postId, userId }) => {
  const date = formatDate(updatedAt);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const userData = useSelector(getUserData);
  const idOwnerComment = userData && userData._id;
  const [value, setValue] = useState(text);
  const { pathname } = useLocation();

  const removeComment = () => {
    if (window.confirm("Удалить комментарий?")) {
      dispatch(deleteComment(id, postId, userId));
    }
  };

  const editTextComment = (e) => {
    setValue(e.currentTarget.value);
  };

  const onKeyDown = (e, value) => {
    if (e.keyCode === 13) {
      dispatch(editComment(id, value, postId, userId));
      setVisible(false);
    }
  };

  return (
    <div className={styles.comment__wrapper}>
      <div className={styles.comment__header}>
        <h3>{userName}</h3>
        <time>{date}</time>
      </div>
      {visible ? (
        <input
          onChange={editTextComment}
          onKeyDown={(e) => onKeyDown(e, value)}
          placeholder={value}
          value={value}
        />
      ) : (
        <div className={styles.comment__text}>{text}</div>
      )}
      {userId === idOwnerComment ? (
        <div className={styles.comment__icons}>
          {visible ? null : (
            <>
              <DeleteOutlineIcon
                onClick={removeComment}
                style={{ cursor: "pointer" }}
              />
              {pathname === "/profile" ? null : (
                <DriveFileRenameOutlineIcon
                  onClick={() => setVisible(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
