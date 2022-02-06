import styles from "./SidebarInfo.module.scss";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/authSelectors";
import { formatDate } from "../../utils/formatDate";

export const SidebarInfo = () => {
  const data = useSelector(getUserData);

  return (
    <div className={styles.sidebar__info_root}>
      <div className={styles.name}>{data && data.fullName}</div>
      <div className={styles.date}>
        Дата регистрации: {data && formatDate(data.createdAt)}
      </div>
    </div>
  );
};
