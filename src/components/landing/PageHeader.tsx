import { RevealOnScroll } from "./RevealOnScroll";

export function PageHeader({
  titulo,
  intro,
}: {
  titulo: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-border bg-cream-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-2xl">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{titulo}</h1>
          {intro && <p className="mt-4 text-base leading-relaxed text-ink-muted">{intro}</p>}
        </RevealOnScroll>
      </div>
    </div>
  );
}
