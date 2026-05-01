"use client";

import { useTheme } from "./theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      className="playzo-theme-toggle"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {mounted ? (
        <i className={`fa ${theme === "dark" ? "fa-sun-o" : "fa-moon-o"}`} aria-hidden />
      ) : (
        <i className="fa fa-moon-o" aria-hidden />
      )}
    </button>
  );
}
