import { Briefcase, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "./RevealOnScroll";

/**
 * Secção de recrutamento na homepage (#recrutamento).
 *
 * Os dois caminhos do texto — procurar vagas em aberto ou enviar candidatura
 * espontânea — são dois botões. Por agora ambos abrem o Portal Ei!; quando
 * existirem endereços distintos, basta trocar cada href abaixo.
 */
const URL_OPORTUNIDADES = "https://portalei.espalhaideias.pt";
const URL_ESPONTANEA = "https://portalei.espalhaideias.pt";

export function Recrutamento() {
  return (
    <section id="recrutamento" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-2xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Recrutamento</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Procure as vagas existentes nas áreas e localizações de interesse ou
            envie a candidatura espontânea.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={URL_OPORTUNIDADES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
            >
              <Briefcase size={18} weight="light" />
              Oportunidades em aberto
            </a>
            <a
              href={URL_ESPONTANEA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 border border-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-olive hover:text-cream"
            >
              <PaperPlaneTilt size={18} weight="light" />
              Candidatura espontânea
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
