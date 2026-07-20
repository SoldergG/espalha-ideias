"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { ContactoModal } from "./ContactoModal";

/**
 * `anchor` links resolve against the landing page; `route` links are their own
 * pages.
 *
 * Keep this list short. The header is capped at max-w-6xl (1152px) regardless
 * of screen size, and logo + nav + CTA only fit inside ~1104px of usable width.
 * Six entries plus the CTA overflowed and squeezed the logo out entirely.
 * Anything secondary belongs in MAIS_LINKS.
 */
const NAV_LINKS = [
  { label: "Sobre", href: "#sobre", type: "anchor" as const },
  { label: "Serviços", href: "#servicos", type: "anchor" as const },
  { label: "Artes & Cultura", href: "/artes-cultura", type: "route" as const },
  { label: "Contacto", href: "#contacto", type: "anchor" as const },
];

const RECRUTAMENTO_URL = "https://portalei.espalhaideias.pt";

const MAIS_LINKS = [
  { label: "Certificações", href: "/#certificacoes", external: false },
  { label: "Links", href: "/#links", external: false },
  { label: "Notícias", href: "/noticias", external: false },
  { label: "Imprensa", href: "/imprensa", external: false },
  { label: "Agenda", href: "/agenda", external: false },
  { label: "Encarregados de Educação", href: "/encarregados-educacao", external: false },
  { label: "Recrutamento", href: RECRUTAMENTO_URL, external: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [maisOpen, setMaisOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={onHome ? "#top" : "/"}
          aria-label="Espalha Ideias — início"
          className="shrink-0"
        >
          {/* unoptimized: serve o PNG (20KB) tal e qual, sem o otimizador do Next */}
          <Image
            src="/images/logo-espalha-ideias.png"
            alt="Espalha Ideias"
            width={277}
            height={67}
            priority
            unoptimized
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <div className="hidden min-w-0 items-center gap-6 xl:flex">
          <nav className="flex items-center gap-5">
          {NAV_LINKS.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={onHome ? link.href : `/${link.href}`}
                className="whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            )
          )}

          <div
            className="group relative"
            onMouseEnter={() => setMaisOpen(true)}
            onMouseLeave={() => setMaisOpen(false)}
          >
            <button
              type="button"
              aria-expanded={maisOpen}
              className="flex items-center gap-1 whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
            >
              Mais
              <CaretDown size={12} weight="bold" />
            </button>
            {maisOpen && (
              <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 border border-border bg-paper py-2 shadow-sm">
                {MAIS_LINKS.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:bg-cream-soft hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:bg-cream-soft hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          </nav>

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex h-11 shrink-0 items-center whitespace-nowrap bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
          >
            Pedido de contacto
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-ink xl:hidden"
        >
          {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream px-4 pb-6 pt-2 xl:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={onHome ? link.href : `/${link.href}`}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {link.label}
                </a>
              )
            )}
            {MAIS_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted last:border-b-0"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted last:border-b-0"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setContactOpen(true);
            }}
            className="mt-4 flex h-11 w-full items-center justify-center bg-orange text-center text-[13px] font-medium uppercase tracking-[0.12em] text-ink"
          >
            Pedido de contacto
          </button>
        </div>
      )}

      <ContactoModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
