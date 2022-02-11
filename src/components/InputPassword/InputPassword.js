import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import styles from "./InputPassword.module.scss";

export const InputPassword = ({ register }) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");

  const handleVisible = () => {
    if (type === "password") {
      setVisible(true);
      setType("text");
    } else if (type === "text") {
      setVisible(false);
      setType("password");
    }
  };
  return (
    <div className={styles.input__wrapper}>
      <input
        label="Password"
        type={type}
        name="password"
        autoComplete="current-password"
        {...register("password")}
      />
      {visible ? (
        <Visibility onClick={handleVisible} className={styles.input__icon} />
      ) : (
        <VisibilityOff onClick={handleVisible} className={styles.input__icon} />
      )}
    </div>
  );
};
