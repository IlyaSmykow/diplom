import styles from "./Alert.module.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAlert } from "../../redux/selectors/authSelectors";
import {
  removeAlertMessages,
  closeInfoAlert,
} from "../../redux/reducers/auth_reducer";

export const Alert = ({ children }) => {
  const dispatch = useDispatch();
  const showAlert = useSelector(getAlert);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setOpen(true);
    }
  }, [showAlert]);

  const closeAlert = () => {
    setOpen(false);
    dispatch(removeAlertMessages());
    dispatch(closeInfoAlert());
  };
  return (
    <div className={open ? styles.alert__wrapper : styles.alert__close}>
      {children}
      <div onClick={closeAlert} className={styles.alert__icon_close}>
        <ClearIcon />
      </div>
    </div>
  );
};
