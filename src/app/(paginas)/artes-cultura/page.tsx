import type { Metadata } from "next";
import { getServicos } from "@/lib/content/queries";
import { PageHeader } from "@/components/landing/PageHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { ServicoCard } from "@/components/landing/ServicoCard";

export const metadata: Metadata = {
  title: "Artes & Cultura — Espalha Ideias",
  description:
    "Equipas especializadas para museus, centros culturais, teatros e salas de espetáculos: assistentes de sala, bilheteira, mediação cultural e apoio a espetáculos e eventos.",
};

export default async function ArtesCulturaPage() {
  const servicos = await getServicos("artes-cultura");

  return (
    <>
      <PageHeader
        titulo="Artes & Cultura"
        intro="A Espalha Ideias coloca equipas especializadas em museus, centros culturais, teatros, salas de espetáculos e outros espaços artísticos, assegurando o acolhimento do público e o funcionamento diário dos equipamentos."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {servicos.map((servico, index) => (
            <RevealOnScroll key={servico.slug} delay={index * 0.08}>
              <ServicoCard servico={servico} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}
