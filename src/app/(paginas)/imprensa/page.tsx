import type { Metadata } from "next";
import { FileText, Newspaper } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/landing/PageHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

export const metadata: Metadata = {
  title: "Imprensa — Espalha Ideias",
  description: "A Espalha Ideias na imprensa desde 2006.",
};

const MENCOES = [
  {
    publicacao: "Dinheiro SA",
    seccao: "Dinheiro & Empreendedorismo",
    data: "Janeiro de 2006",
    excerto:
      "\"Educação — Os alunos têm muito tempo livre após as aulas. Os pais estão a trabalhar, então como ocupá-los?\" A revista Dinheiro SA destacou a Espalha Ideias como resposta a esta necessidade das famílias portuguesas.",
    pdfUrl: "/documents/imprensa-dinheiro-sa-2006.pdf",
  },
  {
    publicacao: "Revista Brilho",
    seccao: "Associação Nacional de Jovens Empresários, Lisboa e Vale do Tejo",
    data: "Maio de 2006",
    excerto:
      "\"A Espalha Ideias nasce da visão de uma dupla de empreendedores, Raul Correia e Sílvia Gomes, e da determinação em colaborar com os pais na ocupação das crianças do ensino básico e pré-escolar durante o longo período de tempos livres imposto pelo sistema de ensino público.\"",
    pdfUrl: null,
  },
  {
    publicacao: "ExpressoEmprego.pt",
    seccao: "O negócio dos tempos livres",
    data: "4 de Janeiro de 2008",
    excerto:
      "\"Raul Correia e Sílvia Gomes são dois jovens que há seis anos arriscaram na criação de um negócio próprio (...) Actualmente são contratados directamente pelo promotor das actividades de enriquecimento curricular, para as desenvolver.\"",
    pdfUrl: null,
  },
];

export default function ImprensaPage() {
  return (
    <>
      <PageHeader
        titulo="Imprensa"
        intro="Na imprensa desde 2006 — parte do percurso da Espalha Ideias contado por terceiros."
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-6">
          {MENCOES.map((mencao, index) => (
            <RevealOnScroll key={mencao.publicacao + mencao.data} delay={index * 0.08}>
              <div className="border border-border bg-paper p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Newspaper size={20} weight="light" className="mt-0.5 shrink-0 text-olive" />
                  <div>
                    <p className="font-display text-lg text-ink">{mencao.publicacao}</p>
                    <p className="text-xs uppercase tracking-[0.08em] text-ink-muted">
                      {mencao.seccao} · {mencao.data}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{mencao.excerto}</p>
                {mencao.pdfUrl && (
                  <a
                    href={mencao.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-olive hover:text-olive-dark"
                  >
                    <FileText size={14} weight="light" />
                    Ver artigo original
                  </a>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}
