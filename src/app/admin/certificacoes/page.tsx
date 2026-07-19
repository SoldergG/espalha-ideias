import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { CertificacaoRow } from "./certificacao-row";
import { IntroForm } from "./intro-form";

export default async function CertificacoesPage() {
  const [{ data: config, error: configError }, { data: certificacoes, error: certError }] =
    await Promise.all([
      supabaseAdmin.from("site_config").select("certificacoes_intro").eq("id", 1).single(),
      supabaseAdmin
        .from("certificacoes")
        .select("id, titulo, publicado")
        .order("ordem", { ascending: true }),
    ]);
  if (configError) throw configError;
  if (certError) throw certError;

  return (
    <AdminShell title="Certificações">
      <IntroForm intro={config?.certificacoes_intro ?? ""} />

      <Link
        href="/admin/certificacoes/novo"
        className="mb-6 inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
      >
        + Nova certificação
      </Link>

      <div className="flex flex-col gap-3">
        {(certificacoes ?? []).map((certificacao, index) => (
          <CertificacaoRow
            key={certificacao.id}
            certificacao={certificacao}
            isFirst={index === 0}
            isLast={index === (certificacoes ?? []).length - 1}
          />
        ))}
        {certificacoes?.length === 0 && (
          <p className="text-sm text-ink-muted">Ainda não há certificações.</p>
        )}
      </div>
    </AdminShell>
  );
}
