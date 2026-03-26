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
        <header>
          <h1>{title}</h1>
        </header>
      )}
      <article>{children}</article>
    </section>
  );
};
