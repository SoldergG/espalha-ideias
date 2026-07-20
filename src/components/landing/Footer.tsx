import { FacebookLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

const FOOTER_LINKS = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Artes & Cultura", href: "/artes-cultura" },
  { label: "Links", href: "/#links" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Notícias", href: "/noticias" },
  { label: "Imprensa", href: "/imprensa" },
  { label: "Agenda", href: "/agenda" },
  { label: "Encarregados de Educação", href: "/encarregados-educacao" },
];

export function Footer({
  facebookUrl,
  linkedinUrl,
  pessoasContacto,
}: {
  facebookUrl: string;
  linkedinUrl: string;
  pessoasContacto: string[];
}) {
  return (
    <footer className="border-t border-border bg-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <nav className="-mx-4 flex items-center gap-4 overflow-x-auto whitespace-nowrap px-4 sm:mx-0 sm:px-0">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 text-[11px] uppercase tracking-[0.08em] text-ink-muted hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Espalha Ideias no Facebook"
            className="text-ink-muted hover:text-ink"
          >
            <FacebookLogo size={20} weight="light" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Espalha Ideias no LinkedIn"
            className="text-ink-muted hover:text-ink"
          >
            <LinkedinLogo size={20} weight="light" />
          </a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} Espalha Ideias. Todos os direitos reservados. site{" "}
            <em>powered</em> by Via Educação
            {pessoasContacto.length > 0 && <> · {pessoasContacto.join(" · ")}</>}
          </p>
        </div>
      </div>
    </footer>
  );
}
