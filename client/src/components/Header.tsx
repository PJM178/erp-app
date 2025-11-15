import styles from "./Header.module.css";

interface HeaderProps {
  something?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header className={styles["container"]}>
      <div>This is header, and this is &quot;something&quot; prop: {props.something || "oops, not defined"}</div>
    </header>
  );
};

export default Header;