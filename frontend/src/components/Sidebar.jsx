import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen = true, onNavigate }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.brand}>
        <span className={styles.logo}>EC</span>
        <h2>E-Commerce</h2>
      </div>

      <nav className={styles.nav}>
        <NavItem to="/dashboard" label="Dashboard" onNavigate={onNavigate} />
        <NavItem to="/products" label="Products" onNavigate={onNavigate} />
      </nav>
    </aside>
  );
}

function NavItem({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ""}`
      }
    >
      {label}
    </NavLink>
  );
}
