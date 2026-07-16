import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { updateNoticiaAction } from "../../actions";
import { NoticiaForm } from "../../noticia-form";

export default async function EditarNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("noticias").select("*").eq("id", id).single();
  if (error || !data) notFound();

  return (
    <AdminShell title="Editar notícia" backHref="/admin/noticias">
      <NoticiaForm
        action={updateNoticiaAction.bind(null, id)}
        initialValues={{
          titulo: data.titulo,
          slug: data.slug,
          resumo: data.resumo,
          corpo: data.corpo,
          anexo_texto: data.anexo_texto,
          data_noticia: data.data_noticia,
          categoria: data.categoria,
          image_path: data.image_path,
          image_alt: data.image_alt,
        }}
        submitLabel="Guardar alterações"
      />
    </AdminShell>
  );
}
