import styles from "./MainPage.module.scss";
import Img from "../../img/IMG_9924.jpg";

export const MainPage = () => {
  return (
    <div className={styles.page__wrapper}>
      <h1>Все на Front!</h1>
      <h3>Блог фронтенд-разработчика</h3>
      <div className={styles.main__img}>
        <img src={Img} alt="example" />
      </div>
      <span>О проекте</span>
      <div className={styles.main__text}>
        Этот блог создан на языке Javascript с применением технологий
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-thunk</li>
          <li>Axios</li>
          <li>React hook form</li>
        </ul>
      </div>
    </div>
  );
};
