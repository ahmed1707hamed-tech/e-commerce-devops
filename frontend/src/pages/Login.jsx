import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const API_URL = "http://localhost:5000/api/auth/login";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim() !== "" && password.trim() !== "";
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(API_URL, {
        email: email.trim(),
        password: password.trim(),
      });
      navigate("/dashboard");
    } catch (requestError) {
      const message =
        requestError?.response?.data?.detail ||
        "Login failed. Please check your credentials.";
      setError(String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <span>EC</span>
        </div>

        <h1>E-Commerce Admin</h1>
        <p>Welcome back. Please sign in to continue.</p>

        <label className={styles.inputGroup}>
          <span className={styles.icon} aria-hidden="true">
            @
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
          />
        </label>

        <label className={styles.inputGroup}>
          <span className={styles.icon} aria-hidden="true">
            *
          </span>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className={styles.toggle}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}

        <button type="submit" className={styles.submit} disabled={loading || !canSubmit}>
          {loading ? (
            <span className={styles.loadingWrap}>
              <span className={styles.spinner} aria-hidden="true" />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}