import styles from "./ModalWindow.module.scss";
import { useState } from "react";
import { LoginForm } from "../../forms/Login/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { getActive } from "../../redux/selectors/appSelectors";
import { RegForm } from "../../forms/Reg/RegForm";
import ClearIcon from "@mui/icons-material/Clear";
import { toggleActive } from "../../redux/reducers/app_reducer";
import { removeAlertMessages } from "../../redux/reducers/auth_reducer";

export const ModalWindow = () => {
  const dispatch = useDispatch();
  const active = useSelector(getActive);
  const [show, setShow] = useState(false);
  const [formTitle, setFormTitle] = useState("Вход в аккаунт");

  const closeModalWindow = () => {
    dispatch(toggleActive(false));
    dispatch(removeAlertMessages());
  };

  const toggleFormType = () => {
    if (formTitle === "Вход в аккаунт") {
      setShow(true);
      setFormTitle("Регистрация");
    } else if (formTitle === "Регистрация") {
      setShow(false);
      setFormTitle("Вход в аккаунт");
    }
  };

  return (
    <div className={active ? styles.modal__open : styles.modal__close}>
      <div className={styles.form__wrapper}>
        <div className={styles.form__title}>
          <h2>{formTitle}</h2>
          <ClearIcon onClick={closeModalWindow} style={{ cursor: "pointer" }} />
        </div>
        {show ? <RegForm /> : <LoginForm />}
        <div className={styles.modal__footer}>
          {show ? (
            <div className={styles.modal__redirect_button}>
              <button onClick={toggleFormType}>авторизация</button>
            </div>
          ) : (
            <div className={styles.modal__redirect_button}>
              Нет аккаунта?{" "}
              <button onClick={toggleFormType}>регистрация</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
