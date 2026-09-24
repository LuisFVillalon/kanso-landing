type Props = { id?: string; title: string; subtitle?: string; align?: "center" | "left" };

export function SectionHeading({ id, title, subtitle, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <h2 id={id} className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-[40px] sm:leading-[48px]">
        {title}
      </h2>
      {subtitle && <p className="mt-3.5 text-lg leading-7 text-secondary">{subtitle}</p>}
    </div>
  );
}
