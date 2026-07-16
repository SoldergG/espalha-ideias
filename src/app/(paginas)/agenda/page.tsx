import type { Metadata } from "next";
import Link from "next/link";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/landing/PageHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

export const metadata: Metadata = {
  title: "Agenda — Espalha Ideias",
  description: "Eventos e datas assinaladas pela Espalha Ideias.",
};

const EVENTOS = [
  {
    titulo: "ACE 2º CICLO - Atividades de Complemento Educativo",
    data: "19 de Janeiro de 2024",
    href: "/noticias/ace-2-ciclo-atividades-de-complemento-educativo",
  },
  {
    titulo: "Ofertas de emprego",
    data: "21 de Janeiro de 2022",
    href: "/noticias",
  },
];

export default function AgendaPage() {
  return (
    <>
      <PageHeader
        titulo="Agenda"
        intro="Datas e eventos assinalados pela Espalha Ideias. Novas oportunidades e comunicados são também publicados em Notícias."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4">
          {EVENTOS.map((evento, index) => (
            <RevealOnScroll key={evento.titulo} delay={index * 0.08}>
              <Link
                href={evento.href}
                className="flex items-start gap-3 border border-border bg-paper p-6 transition-colors hover:border-olive"
              >
                <CalendarBlank size={20} weight="light" className="mt-0.5 shrink-0 text-olive" />
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-ink-muted">{evento.data}</p>
                  <p className="mt-1 font-display text-lg text-ink">{evento.titulo}</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}
