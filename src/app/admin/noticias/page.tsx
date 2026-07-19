import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NoticiaRow } from "./noticia-row";

export default async function NoticiasAdminPage() {
  const { data, error } = await supabaseAdmin
    .from("noticias")
    .select("id, titulo, data_noticia, categoria, publicado")
    .order("ordem", { ascending: true });
  if (error) throw error;

  return (
    <AdminShell title="Notícias">
      <Link
        href="/admin/noticias/novo"
        className="mb-6 inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
      >
        + Nova notícia
      </Link>

      <div className="flex flex-col gap-3">
        {(data ?? []).map((noticia, index) => (
          <NoticiaRow
            key={noticia.id}
            noticia={noticia}
            isFirst={index === 0}
            isLast={index === (data ?? []).length - 1}
          />
        ))}
        {data?.length === 0 && <p className="text-sm text-ink-muted">Ainda não há notícias.</p>}
      </div>
    </AdminShell>
  );
}
