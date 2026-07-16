import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getNoticias } from "@/lib/content/queries";
import { PageHeader } from "@/components/landing/PageHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notícias — Espalha Ideias",
  description: "Arquivo de notícias e comunicados da Espalha Ideias desde 2012.",
};

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <>
      <PageHeader
        titulo="Notícias"
        intro="Arquivo de comunicados, marcos e oportunidades da Espalha Ideias ao longo dos anos."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia, index) => (
            <RevealOnScroll key={noticia.slug} delay={(index % 6) * 0.06}>
              <Link
                href={`/noticias/${noticia.slug}`}
                className="flex h-full flex-col overflow-hidden border border-border bg-paper transition-colors hover:border-olive"
              >
                {noticia.imageSrc && (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={noticia.imageSrc}
                      alt={noticia.imageAlt ?? noticia.titulo}
                      fill
                      sizes="(min-width: 1024px) 380px, 90vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                    {noticia.dataNoticia}
                    {noticia.categoria === "recrutamento" && " · Recrutamento"}
                  </p>
                  <h2 className="mt-2 font-display text-xl text-ink">{noticia.titulo}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{noticia.resumo}</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}
