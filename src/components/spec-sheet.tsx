type Props = {
  items: string[];
};
export const SpecSheet = ({ items }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-2.5 py-1 bg-[color:var(--color-surface-muted)] rounded-md text-sm text-[color:var(--color-text-muted)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};
