import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getNoticiaBySlug } from "@/lib/content/queries";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

export const revalidate = 60;

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

function linkifyParagraph(texto: string, keyPrefix: string) {
  const partes = texto.split(URL_PATTERN);
  return partes.map((parte, i) =>
    URL_PATTERN.test(parte) ? (
      <a
        key={`${keyPrefix}-${i}`}
        href={parte}
        target="_blank"
        rel="noopener noreferrer"
        className="text-olive underline hover:text-olive-dark"
      >
        {parte}
      </a>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{parte}</span>
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) return {};
  return {
    title: `${noticia.titulo} — Espalha Ideias`,
    description: noticia.resumo,
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) notFound();

  const paragrafos = noticia.corpo.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <RevealOnScroll>
        <Link
          href="/noticias"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={14} weight="light" />
          Notícias
        </Link>

        <p className="mt-6 text-xs uppercase tracking-[0.1em] text-ink-muted">
          {noticia.dataNoticia}
          {noticia.categoria === "recrutamento" && " · Recrutamento"}
        </p>
        <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{noticia.titulo}</h1>

        {noticia.imageSrc && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-border">
            <Image
              src={noticia.imageSrc}
              alt={noticia.imageAlt ?? noticia.titulo}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-ink">
          {paragrafos.map((paragrafo, i) => (
            <p key={i}>{linkifyParagraph(paragrafo, `p${i}`)}</p>
          ))}
        </div>

        {noticia.anexoTexto && (
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">Documentos e ligações</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {linkifyParagraph(noticia.anexoTexto, "anexo")}
            </p>
          </div>
        )}
      </RevealOnScroll>
    </article>
  );
}
