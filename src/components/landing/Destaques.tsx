import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Destaque } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

function DestaqueCardBody({ destaque }: { destaque: Destaque }) {
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
        {destaque.linkHref && (
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-olive">
            Saber mais
            <ArrowRight size={14} weight="light" />
          </span>
        )}
      </div>
    </div>
  );
}

/** Wraps the card in a link only when the editor filled in "Link" in the admin. */
function DestaqueCard({ destaque }: { destaque: Destaque }) {
  if (!destaque.linkHref) return <DestaqueCardBody destaque={destaque} />;

  const isExternal = /^https?:\/\//.test(destaque.linkHref);

  return (
    <a
      href={destaque.linkHref}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block transition-colors hover:[&>div]:border-olive"
    >
      <DestaqueCardBody destaque={destaque} />
    </a>
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
