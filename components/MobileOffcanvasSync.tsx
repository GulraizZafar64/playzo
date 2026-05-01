"use client";

import { useEffect } from "react";

const OFFCANVAS_ID = "playverseSidebar";

/** 
 * One-time effect to sync the data-offcanvas-nav attribute on <html> 
 * with the Bootstrap offcanvas state. Useful for side-padding shifts. 
 */
export default function MobileOffcanvasSync() {
  useEffect(() => {
    const el = document.getElementById(OFFCANVAS_ID);
    if (!el) return;

    const onShow = () => document.documentElement.setAttribute("data-offcanvas-nav", "open");
    const onHide = () => document.documentElement.setAttribute("data-offcanvas-nav", "closed");

    el.addEventListener("show.bs.offcanvas", onShow);
    el.addEventListener("hidden.bs.offcanvas", onHide);

    return () => {
      el.removeEventListener("show.bs.offcanvas", onShow);
      el.removeEventListener("hidden.bs.offcanvas", onHide);
    };
  }, []);

  return null;
}
