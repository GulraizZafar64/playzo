"use client";

import { useEffect } from "react";

function openSearchModal() {
  const modalEl = document.getElementById("searchGameModal");
  if (!modalEl) return;

  const bs = (
    window as unknown as {
      bootstrap?: { Modal: { getOrCreateInstance: (el: Element) => { show: () => void } } };
    }
  ).bootstrap;
  if (bs?.Modal) {
    bs.Modal.getOrCreateInstance(modalEl).show();
  }
}

export default function SearchHotkeys() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        openSearchModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
