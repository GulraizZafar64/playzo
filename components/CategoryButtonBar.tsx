import Link from "next/link";
import { CATEGORY_LINKS } from "@/lib/categories";

export default function CategoryButtonBar() {
  return (
    <div className="category-button-bar" aria-label="Game categories">
      <div className="category-button-bar-inner container-fluid px-2 px-sm-3">
        <div className="category-button-bar-scroll">
          {CATEGORY_LINKS.map((c) => (
            <Link key={c.href} href={c.href} className="category-pill-btn" prefetch>
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
