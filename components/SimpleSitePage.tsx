import type { ReactNode } from "react";

type Props = { title: string; children: ReactNode };

export default function SimpleSitePage({ title, children }: Props) {
  return (
    <div className="container py-4 py-lg-5 playzo-simple-page">
      <h1 className="playzo-simple-page-title">{title}</h1>
      <div className="playzo-simple-page-body">{children}</div>
    </div>
  );
}
