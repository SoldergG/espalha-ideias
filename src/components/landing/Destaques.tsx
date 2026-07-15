import Image from "next/image";
import type { Destaque } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

function DestaqueCard({ destaque }: { destaque: Destaque }) {
  return (
    <div className="grid grid-cols-1 items-stretch overflow-hidden border border-border bg-paper md:grid-cols-2">
      <div className="relative aspect-[16/10] md:aspect-auto">
        <Image
          src={destaque.imageSrc}
          alt={destaque.imageAlt}
          fill
          sizes="(min-width: 768px) 560px, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">{destaque.dataDestaque}</p>
        <h3 className="mt-2 font-display text-2xl text-ink">{destaque.titulo}</h3>
        <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-ink-muted">{destaque.resumo}</p>
      </div>
    </div>
  );
}

export function Destaques({ destaques }: { destaques: Destaque[] }) {
  if (destaques.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Novidades</h2>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-1 gap-6">
          {destaques.map((destaque) => (
            <RevealOnScroll key={destaque.id}>
              <DestaqueCard destaque={destaque} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
