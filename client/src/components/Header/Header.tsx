import Link from "next/link";
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
      <nav className={styles["nav"]}>
        <Link href={"/"}>
          <div>Home</div>
        </Link>
        <Link href={"/payments"}>
          <div>Payments</div>
        </Link>
      </nav>

    </header>
  );
};

export default Header;