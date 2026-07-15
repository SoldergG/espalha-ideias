import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Sobre as SobreContent } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

export function Sobre({ content }: { content: SobreContent }) {
  const anosDeAtividade = new Date().getFullYear() - content.anoFundacao;

  return (
    <section id="sobre" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] w-full overflow-hidden border border-border">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 border border-border bg-paper px-5 py-4 sm:-right-8">
            <p className="font-display text-3xl text-orange">{anosDeAtividade}</p>
            <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">anos de experiência</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="order-1 lg:order-2">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{content.titulo}</h2>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-muted">
            {content.textoIntro}
          </p>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-ink-muted">
            {content.textoObjetivos}
          </p>

          <p className="mt-6 text-sm font-medium text-ink">{content.textoMetodo}</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {content.pontosMetodo.map((ponto) => (
              <li key={ponto} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <CheckCircle size={18} weight="light" className="mt-0.5 shrink-0 text-olive" />
                <span>{ponto}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
