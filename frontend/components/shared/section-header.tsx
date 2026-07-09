type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div>
      {eyebrow ? <p className="text-sm font-medium text-brand-600">{eyebrow}</p> : null}
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">{description}</p> : null}
    </div>
  );
}