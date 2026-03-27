import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// GitHub Pages SPA deep-link restore (see public/404.html).
try {
  const redirect = sessionStorage.getItem("spa-redirect");
  if (redirect) {
    sessionStorage.removeItem("spa-redirect");
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (redirect !== current) {
      window.history.replaceState(null, "", redirect);
    }
  }
} catch (e) {
  // ignore
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
