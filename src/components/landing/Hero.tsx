import type { Hero as HeroContent } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

/**
 * Renders the headline from the database, italicising any segment the editor
 * wrapped in asterisks: "Equipas que dão vida a *espaços culturais*".
 */
function Headline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, index) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        )
      )}
    </>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="top" className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <RevealOnScroll>
          <p className="text-[13px] uppercase tracking-[0.16em] text-olive">{content.kicker}</p>
          <h1 className="mt-5 pb-1 font-display text-[2.6rem] leading-[1.15] text-ink sm:text-5xl lg:text-[3.4rem]">
            <Headline text={content.headline} />
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
            {content.subheadline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={content.ctaPrimaryHref}
              className="inline-flex h-12 items-center bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
            >
              {content.ctaPrimaryLabel}
            </a>
            <a
              href={content.ctaSecondaryHref}
              className="inline-flex h-12 items-center border border-border px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-olive hover:text-olive"
            >
              {content.ctaSecondaryLabel}
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-border">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={content.imageSrc}
              aria-label={content.imageAlt}
            >
              <source src="/videos/motricidade-infantil.mp4" type="video/mp4" />
            </video>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
