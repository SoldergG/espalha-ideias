import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { DestaqueRow } from "./destaque-row";

export default async function DestaquesPage() {
  const { data, error } = await supabaseAdmin
    .from("destaques")
    .select("id, titulo, data_destaque, publicado")
    .order("ordem", { ascending: true })
    .order("data_destaque", { ascending: false });
  if (error) throw error;

  return (
    <AdminShell title="Destaques">
      <Link
        href="/admin/destaques/novo"
        className="mb-6 inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
      >
        + Novo destaque
      </Link>

      <div className="flex flex-col gap-3">
        {(data ?? []).map((destaque, index) => (
          <DestaqueRow
            key={destaque.id}
            destaque={destaque}
            isFirst={index === 0}
            isLast={index === (data ?? []).length - 1}
          />
        ))}
        {data?.length === 0 && <p className="text-sm text-ink-muted">Ainda não há destaques.</p>}
      </div>
    </AdminShell>
  );
}
