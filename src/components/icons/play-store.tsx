type Props = {
  size?: number;
  title?: string;
  className?: string;
};

export const PlayStore = ({ size = 16, title = "Play Store", className = "" }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-label={title}
      className={className}
    >
      <path d="M5.927 22.5c-.232 0-.441-.065-.633-.21-.19-.13-.342-.321-.456-.573l8.69-8.69 3.13 3.13-10.15 5.73c-.221.127-.417.19-.581.19zm-.581-20.73c.114-.252.266-.443.456-.573.192-.145.401-.21.633-.21.164 0 .36.063.581.19l10.15 5.73-3.13 3.13-8.69-8.69v17.38zM17.47 12l2.64-1.49c.593-.332.89-.781.89-1.34s-.297-1.008-.89-1.34l-2.64-1.49-3.13 3.13v2.66l3.13 3.13 2.64-1.49c.593-.332.89-.781.89-1.34s-.297-1.008-.89-1.34l-2.64-1.49z" />
    </svg>
  );
};
