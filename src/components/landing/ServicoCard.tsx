import Image from "next/image";
import type { Servico } from "@/lib/content/types";

export function PontoTag({ label }: { label: string }) {
  return (
    <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.06em] text-ink-muted">
      {label}
    </span>
  );
}

export function ServicoCard({ servico }: { servico: Servico }) {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-paper">
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
