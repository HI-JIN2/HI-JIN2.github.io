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
      {title && (
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-[color:var(--color-text)] border-b border-[color:var(--color-border)] pb-2">
            {title}
          </h2>
        </header>
      )}
      <article>{children}</article>
    </section>
  );
};
