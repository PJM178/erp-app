import LoginForm from "./_components/LoginForm";
import styles from "./page.module.css";

const LoginHome = () => {
  return (
    <div
      className={styles["page"]}
    >
      login page
      <LoginForm />
    </div>
  );
};

export default LoginHome;