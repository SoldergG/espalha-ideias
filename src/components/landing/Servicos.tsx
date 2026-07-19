import Image from "next/image";
import { FileText } from "@phosphor-icons/react/dist/ssr";
import type { Servico } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

function PontoTag({ label }: { label: string }) {
  return (
    <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.06em] text-ink-muted">
      {label}
    </span>
  );
}

function FeaturedServiceCard({ servico }: { servico: Servico }) {
  return (
    <div className="grid grid-cols-1 overflow-hidden border border-border bg-paper sm:grid-cols-2">
      <div className="relative aspect-[4/3] sm:aspect-auto">
        <Image
          src={servico.imageSrc}
          alt={servico.imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <h3 className="font-display text-2xl text-ink">{servico.titulo}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{servico.resumo}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {servico.pontos.map((ponto) => (
            <PontoTag key={ponto} label={ponto} />
          ))}
        </div>
        {servico.slug === "aec" && (
          <a
            href="/documents/despacho-9265b-2013.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-olive hover:text-olive-dark"
          >
            <FileText size={14} weight="light" />
            Ver Despacho n.º 9265-B/2013
          </a>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ servico }: { servico: Servico }) {
  return (
    <div className="flex flex-col overflow-hidden border border-border bg-paper">
      <div className="relative aspect-[16/10]">
        <Image
          src={servico.imageSrc}
          alt={servico.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl text-ink">{servico.titulo}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{servico.resumo}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {servico.pontos.map((ponto) => (
            <PontoTag key={ponto} label={ponto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Servicos({ servicos }: { servicos: Servico[] }) {
  const [featured, ...rest] = servicos;

  return (
    <section id="servicos" className="bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Os nossos serviços</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Cinco áreas de atuação, uma só equipa.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {featured && (
            <RevealOnScroll>
              <FeaturedServiceCard servico={featured} />
            </RevealOnScroll>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {rest.map((servico, index) => (
              <RevealOnScroll key={servico.slug} delay={index * 0.08}>
                <ServiceCard servico={servico} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
