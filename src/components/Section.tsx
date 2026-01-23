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
      <div className="bg-[color:var(--color-surface)] backdrop-blur-md border border-[color:var(--color-border)] shadow-[var(--ui-shadow)] hover:shadow-[var(--ui-shadow-hover)] transition-shadow px-6 py-7 sm:px-8 sm:py-9 motion-safe:animate-[fadeUp_0.35s_ease-out_both] rounded-[var(--ui-radius-card)]">
        {title && (
          <header className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[color:var(--color-text)] tracking-tight">
              {title}
            </h2>
          </header>
        )}
        <article>{children}</article>
      </div>
    </section>
  );
};
