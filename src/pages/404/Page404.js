import styles from "./Page404.module.scss";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

export const Page404 = () => {
  return (
    <div className={styles.page__wrapper}>
      <h1>Страница не найдена</h1>
      <DoNotDisturbOnIcon fontSize="large" className={styles.page__icon} />
    </div>
  );
};
