import styles from "./Loaders.module.scss";

export const WaitPost = () => {
  return (
    <div className={styles.loader__wrapper}>
      <section className={styles.loader__header}>
        <div className={styles.loader__header_title}>
          <div className={styles.loader__header_one}></div>
          <div className={styles.loader__header_two}></div>
        </div>
        <div className={styles.loader__header_three}></div>
        <div className={styles.loader__header_four}></div>
        <div className={styles.loader__header_five}></div>
        <div className={styles.loader__header_six}></div>
      </section>
      <section className={styles.loader__main}>
        <div className={styles.loader__post_wrapper}>
          <div className={styles.loader__post_one}></div>
          <div className={styles.loader__post_two}></div>
          <div className={styles.loader__post_three}></div>
          <div className={styles.loader__post_four}></div>
        </div>
        <div className={styles.loader__post_wrapper}>
          <div className={styles.loader__post_one}></div>
          <div className={styles.loader__post_two}></div>
          <div className={styles.loader__post_three}></div>
          <div className={styles.loader__post_four}></div>
        </div>
        <div className={styles.loader__post_wrapper}>
          <div className={styles.loader__post_one}></div>
          <div className={styles.loader__post_two}></div>
          <div className={styles.loader__post_three}></div>
          <div className={styles.loader__post_four}></div>
        </div>
      </section>
    </div>
  );
};
