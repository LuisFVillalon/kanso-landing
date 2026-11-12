type Props = { id: string; eyebrow?: string; title: React.ReactNode; subtitle?: string; align?: "center" | "left" };

export function SectionHeading({ id, eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="text-xs leading-4 font-bold tracking-[0.12em] text-muted uppercase">{eyebrow}</p>}
      <h2 id={id} className="mt-2.5 font-display text-[32px] leading-10 font-medium text-ink sm:text-[40px] sm:leading-12">
        {title}
      </h2>
      {subtitle && <p className="mt-3.5 text-lg leading-7 text-secondary">{subtitle}</p>}
    </div>
  );
}
