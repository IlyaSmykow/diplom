import styles from "./Loaders.module.scss";
import { useSelector } from "react-redux";
import { getResponse } from "../../redux/selectors/postsSelectors";

export const WaitAllPosts = () => {
  const response = useSelector(getResponse);
  return (
    <div className={styles.loader__wrapper}>
      {response.items ? (
        <h3>По вашему запросу ничего не нашлось</h3>
      ) : (
        <>
          <div className={styles.loader__fake_block}>
            <div className={styles.loader__fake_title}></div>
            <span>
              <div className={styles.loader__fake_text}></div>
              <div className={styles.loader__fake_image}></div>
            </span>
            <div className={styles.loader__fake_footer}></div>
          </div>
          <div className={styles.loader__fake_block}>
            <div className={styles.loader__fake_title}></div>
            <span>
              <div className={styles.loader__fake_text}></div>
              <div className={styles.loader__fake_image}></div>
            </span>
            <div className={styles.loader__fake_footer}></div>
          </div>
          <div className={styles.loader__fake_block}>
            <div className={styles.loader__fake_title}></div>
            <span>
              <div className={styles.loader__fake_text}></div>
              <div className={styles.loader__fake_image}></div>
            </span>
            <div className={styles.loader__fake_footer}></div>
          </div>
          <div className={styles.loader__fake_block}>
            <div className={styles.loader__fake_title}></div>
            <span>
              <div className={styles.loader__fake_text}></div>
              <div className={styles.loader__fake_image}></div>
            </span>
            <div className={styles.loader__fake_footer}></div>
          </div>
        </>
      )}
    </div>
  );
};
