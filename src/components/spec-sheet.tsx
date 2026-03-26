type Props = {
  items: string[];
};
export const SpecSheet = ({ items }: Props) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
      {items.map((item, index) => (
        <span key={item} className="text-[color:var(--color-text-muted)]">
          <code>{item}</code>
          {index < items.length - 1 && <span className="opacity-50">,</span>}
        </span>
      ))}
    </div>
  );
};
