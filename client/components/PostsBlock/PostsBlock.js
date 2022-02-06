import styles from "./PostsBlock.module.scss";
import { Post } from "../Post/Post";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getTotalNumberPosts,
} from "../../redux/selectors/postsSelectors";
import { togglePage } from "../../redux/reducers/posts_reducer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { PostsHeader } from "../PostsHeader/PostsHeader";
import { WaitAllPosts } from "../Loaders/WaitAllPosts";
import { useLocation } from "react-router-dom";

export const PostsBlock = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const posts = useSelector(getPosts);
  const totalPosts = useSelector(getTotalNumberPosts);
  const [page, setPage] = useState(1);
  const postsPortionOnPage = 5;
  const totalPageCount = Math.ceil(totalPosts / postsPortionOnPage);

  const prevPage = () => {
    if (page >= 1) {
      dispatch(togglePage(page - 1));
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    dispatch(togglePage(page + 1));
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {pathname === "/profile" ? null : (
        <div className={styles.posts__wrapper}>
          <PostsHeader />
          <div className={styles.posts__items}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  text={post.text}
                  views={post.views}
                  createdAt={post.createdAt}
                  img={post.photoUrl}
                  userId={post.user._id}
                />
              ))
            ) : (
              <WaitAllPosts />
            )}
          </div>
          <div className={styles.posts__footer}>
            <div className={styles.footer__pages}>
              страница {page} из {totalPageCount}
            </div>
            <span>
              <IconButton
                disabled={page === totalPageCount}
                onClick={nextPage}
                style={{ cursor: "pointer" }}
              >
                <ArrowForwardIcon />
              </IconButton>
              <IconButton
                onClick={prevPage}
                disabled={page === 1}
                style={{ cursor: "pointer" }}
              >
                <ArrowBackIcon />
              </IconButton>
            </span>
          </div>
        </div>
      )}
    </>
  );
};
