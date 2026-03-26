export const LastUpdatedAt = () => {
  return (
    <footer
      style={{
        marginTop: "8rem",
        paddingTop: "2rem",
        paddingBottom: "3rem",
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "var(--color-text-subtle)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: 500,
        }}
      >
        Last updated
      </div>
      <div
        style={{
          fontSize: "13px",
          color: "var(--color-text-muted)",
          fontWeight: 500,
        }}
      >
        2025. 12. 10
      </div>
    </footer>
  );
};
