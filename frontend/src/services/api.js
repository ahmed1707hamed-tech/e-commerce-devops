import axios from "axios";

/**
 * Centralized Axios instance for all API calls.
 *
 * In production the frontend is served by Nginx, which proxies
 * every request starting with /api/ to the backend container.
 * Because we use a relative baseURL, the browser sends the
 * request to the same host:port that served the page —
 * no hardcoded IPs or service names are needed.
 */
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Response interceptor (optional, but useful) ──────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize network errors so callers always get a message
    if (!error.response) {
      error.message = "Network error — please check your connection.";
    }
    return Promise.reject(error);
  }
);

export default api;
