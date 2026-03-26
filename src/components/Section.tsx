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
    <section id={id} style={{ marginTop: mt, marginBottom: mb, ...style }} className="motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
      {title && (
        <header className="mb-4">
          <h2 className="text-2xl font-bold text-[color:var(--color-text)]">
            {title}
          </h2>
        </header>
      )}
      <article>{children}</article>
    </section>
  );
};
