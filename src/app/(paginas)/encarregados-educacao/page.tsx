import type { Metadata } from "next";
import { GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { getEncarregadosEducacao } from "@/lib/content/queries";
import { PageHeader } from "@/components/landing/PageHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Encarregados de Educação — Espalha Ideias",
  description: "Acesso ao Portal Ei! para encarregados de educação.",
};

export default async function EncarregadosEducacaoPage() {
  const info = await getEncarregadosEducacao();

  return (
    <>
      <PageHeader titulo="Encarregados de Educação" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <RevealOnScroll>
          <p className="text-base leading-relaxed text-ink">{info.texto}</p>

          <div className="mt-8">
            <a
              href={info.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
            >
              <GraduationCap size={18} weight="light" />
              Aceder ao Portal Ei!
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
