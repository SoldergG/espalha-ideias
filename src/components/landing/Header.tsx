"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Wordmark } from "./LogoMark";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Certificações", href: "#certificacoes" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top">
          <Wordmark className="font-display text-lg tracking-[0.2em] text-ink sm:text-xl" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contacto"
            className="inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
          >
            Pedir proposta
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-11 items-center justify-center bg-orange text-center text-[13px] font-medium uppercase tracking-[0.12em] text-ink"
          >
            Pedir proposta
          </a>
        </div>
      )}
    </header>
  );
}
