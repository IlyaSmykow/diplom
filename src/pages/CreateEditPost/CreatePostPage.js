import styles from "./PostsPage.module.scss";
import { useEffect } from "react";
import { CreatePostForm } from "../../forms/CreatePost/CreatePostForm";
import { getAllPosts } from "../../redux/reducers/posts_reducer";
import { useDispatch } from "react-redux";

export const CreatePostPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className={styles.posts__wrapper}>
      <CreatePostForm />
    </div>
  );
};
