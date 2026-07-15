import Image from "next/image";
import { FileText } from "@phosphor-icons/react/dist/ssr";
import type { Certificacao } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

export function Certificacoes({
  intro,
  certificacoes,
}: {
  intro: string;
  certificacoes: Certificacao[];
}) {
  return (
    <section id="certificacoes" className="bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-2xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Certificações e distinções
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{intro}</p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {certificacoes.map((certificacao, index) => (
            <RevealOnScroll key={certificacao.id} delay={index * 0.08}>
              <div className="flex items-center gap-5 border border-border bg-paper p-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-cream">
                  <Image
                    src={certificacao.imageSrc}
                    alt={certificacao.imageAlt}
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="font-display text-lg text-ink">{certificacao.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {certificacao.descricao}
                  </p>
                  {certificacao.pdfUrl && (
                    <a
                      href={certificacao.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-olive hover:text-olive-dark"
                    >
                      <FileText size={14} weight="light" />
                      Ver certificado
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
