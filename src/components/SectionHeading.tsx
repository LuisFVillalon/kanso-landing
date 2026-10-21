type Props = { id?: string; title: string; subtitle?: string; align?: "center" | "left" };

export function SectionHeading({ id, title, subtitle, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <h2 id={id} className="font-display text-h2 text-ink">
        {title}
      </h2>
      {subtitle && <p className="mt-3.5 text-lg leading-7 text-secondary">{subtitle}</p>}
    </div>
  );
}
