type Props = {
  items: string[];
};
export const SpecSheet = ({ items }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-2.5 py-1 bg-[color:var(--color-surface-muted)] rounded-[var(--ui-radius-control)] text-sm text-[color:var(--color-text-muted)] border border-[color:var(--color-border)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};
