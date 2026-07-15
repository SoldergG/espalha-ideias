import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { updateDestaqueAction } from "../../actions";
import { DestaqueForm } from "../../destaque-form";

export default async function EditarDestaquePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("destaques").select("*").eq("id", id).single();
  if (error || !data) notFound();

  return (
    <AdminShell title="Editar destaque" backHref="/admin/destaques">
      <DestaqueForm
        action={updateDestaqueAction.bind(null, id)}
        initialValues={{
          titulo: data.titulo,
          resumo: data.resumo,
          data_destaque: data.data_destaque,
          link_href: data.link_href,
          image_path: data.image_path,
          image_alt: data.image_alt,
        }}
        submitLabel="Guardar alterações"
      />
    </AdminShell>
  );
}
