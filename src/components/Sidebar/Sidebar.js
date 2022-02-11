import styles from "./Sidebar.module.scss";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { SidebarInfo } from "../Sidebar_Info/SidebarInfo";
import { SidebarMenu } from "../SidebarMenu/SidebarMenu";
import { useSelector } from "react-redux";
import { getAuth } from "../../redux/selectors/authSelectors";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(getAuth);

  const toggleOpenMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.sidebar__open : styles.sidebar__close}>
      <div className={styles.sidebar__menu}>
        <div className={styles.sidebar__icon} onClick={toggleOpenMenu}>
          {open ? <ClearIcon /> : <DehazeIcon />}
        </div>
      </div>
      <span>MENU</span>
      <div
        className={
          open ? styles.sidebar__info_open : styles.sidebar__info_close
        }
      >
        {auth && <SidebarInfo />}
        <SidebarMenu closeSidebar={toggleOpenMenu} />
      </div>
    </div>
  );
};
