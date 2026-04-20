import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const today = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className={styles.navbar}>
      <div>
        <p className={styles.label}>Admin Panel</p>
        <h1 className={styles.title}>Products Dashboard</h1>
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{today}</span>
        <div className={styles.avatar} aria-hidden="true">
          AH
        </div>
      </div>
    </header>
  );
}
