import styles from "./Header.module.css";
import UserInfo from "./UserInfo";

interface HeaderProps {
  something?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header className={styles["container"]}>
      <div>This is header, and this is &quot;something&quot; prop: {props.something || "oops, not defined"}</div>
      <UserInfo />
    </header>
  );
};

export default Header;