import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>EC</span>
        <h2>E-Commerce</h2>
      </div>

      <nav className={styles.nav}>
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/products" label="Products" />
      </nav>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ""}`
      }
    >
      {label}
    </NavLink>
  );
}
