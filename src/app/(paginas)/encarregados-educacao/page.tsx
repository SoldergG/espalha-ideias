import type { Metadata } from "next";
import { FileArrowDown, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { getEncarregadosEducacao } from "@/lib/content/queries";
import { PageHeader } from "@/components/landing/PageHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Encarregados de Educação — Espalha Ideias",
  description: "Acesso ao portal Educa e ficha de inscrição para encarregados de educação.",
};

export default async function EncarregadosEducacaoPage() {
  const info = await getEncarregadosEducacao();

  return (
    <>
      <PageHeader titulo="Encarregados de Educação" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <RevealOnScroll>
          <p className="text-base leading-relaxed text-ink">{info.texto}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={info.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
            >
              <GraduationCap size={18} weight="light" />
              Aceder ao portal Educa
            </a>
            <a
              href={info.fichaInscricaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 border border-border px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-olive"
            >
              <FileArrowDown size={18} weight="light" />
              Ficha de inscrição
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
