import React from "react";

export const Link = ({
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    className={`text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)] underline transition-colors ${className}`}
  >
    {children}
  </a>
);
