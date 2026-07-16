import { FileText } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "./RevealOnScroll";

const DOCUMENTOS = [
  {
    titulo: "Política de Privacidade",
    href: "/documents/politica-de-privacidade.pdf",
  },
  {
    titulo: "Código de Boa Conduta para a Prevenção e Combate ao Assédio no Trabalho",
    href: "/documents/codigo-boa-conduta-assedio.pdf",
  },
  {
    titulo: "Código de Conduta em Matéria de Prevenção da Corrupção e Infrações Conexas",
    href: "/documents/codigo-conduta-corrupcao.pdf",
  },
];

export function Links() {
  return (
    <section id="links" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-2xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Links</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Políticas e códigos de conduta da Espalha Ideias.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {DOCUMENTOS.map((documento, index) => (
            <RevealOnScroll key={documento.href} delay={index * 0.08}>
              <a
                href={documento.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-start gap-3 border border-border bg-paper p-6 transition-colors hover:border-olive"
              >
                <FileText size={20} weight="light" className="mt-0.5 shrink-0 text-olive" />
                <span className="text-sm leading-relaxed text-ink">{documento.titulo}</span>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
