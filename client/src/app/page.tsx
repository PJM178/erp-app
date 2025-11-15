import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Hello, this is the start of some sort of billing / ERP app
      </main>
    </div>
  );
}
