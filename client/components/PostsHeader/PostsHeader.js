import { useState, useEffect } from "react";
import styles from "./PostsHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { toggleActive } from "../../redux/reducers/app_reducer";
import { userLogout } from "../../redux/reducers/auth_reducer";
import { getAuth } from "../../redux/selectors/authSelectors";
import { getUserData } from "../../redux/selectors/authSelectors";
import { searchPost, getAllPosts } from "../../redux/reducers/posts_reducer";
import { useDebounce } from "../../hooks/useDebounce";

export const PostsHeader = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(getAuth);
  const data = useSelector(getUserData);
  const debouncedSearchTerm = useDebounce(inputValue, 1000);

  const redirect = () => {
    if (auth) {
      navigate("/create");
    } else {
      dispatch(toggleActive(true));
    }
  };

  const logout = () => {
    navigate("/");
    dispatch(userLogout());
  };

  const redirectToProfile = () => {
    if (!auth) {
      dispatch(toggleActive(true));
    }
  };

  const toggleShowInput = () => {
    setVisible(true);
  };

  const closeInput = () => {
    setVisible(false);
    dispatch(getAllPosts());
  };

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchPost(debouncedSearchTerm));
    }
    setInputValue("");
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className={styles.posts__header}>
      <div
        className={visible ? styles.search__input_active : styles.search__input}
      >
        {visible && (
          <>
            <input
              placeholder="Поиск статьи по заголовку или тексту..."
              value={inputValue}
              onChange={handleInputValue}
            />
            <CloseIcon onClick={closeInput} className={styles.close__icon} />
          </>
        )}
      </div>
      {data && data.fullName && <span>{data.fullName.split(" ")[0]} blog</span>}
      {!visible && (
        <div className={styles.posts__header_icons}>
          <div
            className={styles.header__icon}
            data-tooltip="Поиск"
            onClick={toggleShowInput}
          >
            <SearchIcon />
          </div>
          <div
            className={styles.header__icon}
            data-tooltip="Написать"
            onClick={redirect}
          >
            <EditIcon />
          </div>
          {auth ? (
            <div
              className={styles.header__icon}
              data-tooltip="Выход"
              onClick={logout}
            >
              <ExitToAppIcon />
            </div>
          ) : (
            <div
              className={styles.header__icon}
              data-tooltip="Профиль"
              onClick={redirectToProfile}
            >
              <PersonIcon />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
