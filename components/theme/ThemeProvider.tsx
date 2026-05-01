"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext, type ThemeMode } from "./ThemeContext";

const STORAGE_KEY = "gamesapp-theme";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-bs-theme", theme === "light" ? "light" : "dark");
  document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let initial: ThemeMode = "dark";
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === "light" || saved === "dark") {
        initial = saved;
      }
    } catch {
      /* ignore */
    }
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      applyTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggle, mounted }),
    [theme, setTheme, toggle, mounted],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
