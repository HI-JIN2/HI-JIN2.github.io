import React from "react";
import { ResumeSwitcher } from "./resume-switcher";
import { TableOfContents } from "./table-of-contents";
import { useResume } from "../context/resume-context";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { type, data } = useResume();
  const name = data.profile?.name ?? "";

  return (
    <div style={{ position: "relative" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "52px",
          backgroundColor: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          transition: "background-color 0.2s, border-color 0.2s",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            margin: "0 auto",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: name + type */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {name && (
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {name}
              </span>
            )}
            <span
              style={{
                fontSize: "11px",
                color: "var(--color-text-subtle)",
                marginLeft: "0.5rem",
              }}
            >
              /
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--color-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {type === "android" ? "Android Engineer" : "SW Engineer"}
            </span>
          </div>

          {/* Right: switcher + theme */}
          <ResumeSwitcher />
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          paddingTop: "5rem",
          paddingBottom: "4rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          position: "relative",
        }}
      >
        {children}
      </main>

      <TableOfContents />
    </div>
  );
};
