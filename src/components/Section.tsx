import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  mb?: number;
  mt?: number;
  id?: string;
};
export const Section = ({ title, children, mt, mb, style, id }: Props) => {
  return (
    <section id={id} style={{ marginTop: mt, marginBottom: mb, ...style }}>
      <div className="rounded-2xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] shadow-sm px-6 py-6 sm:px-8 sm:py-8">
        {title && (
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] tracking-tight">
              {title}
            </h2>
          </header>
        )}
        <article>{children}</article>
      </div>
    </section>
  );
};
