import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AdminShell } from "@/components/admin/AdminShell";

const SECTIONS = [
  { label: "Hero & Sobre", href: "/admin/hero-sobre", description: "Texto e imagem de destaque e da secção Quem Somos" },
  { label: "Serviços", href: "/admin/servicos", description: "AEC, Componente de Apoio à Família e Férias" },
  { label: "Destaques", href: "/admin/destaques", description: "Novidades mostradas na landing page" },
  { label: "Notícias", href: "/admin/noticias", description: "Arquivo de comunicados e recrutamento" },
  { label: "Certificações", href: "/admin/certificacoes", description: "Selos e distinções da empresa" },
  { label: "Contacto", href: "/admin/contacto", description: "Morada, telefone, email e redes sociais" },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Painel de administração" backHref={null}>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.1em] text-olive hover:text-olive-dark"
      >
        Ver site <ArrowUpRight size={14} weight="light" />
      </a>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="border border-border bg-paper p-6 transition-colors hover:border-olive"
          >
            <p className="font-display text-xl text-ink">{section.label}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{section.description}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
