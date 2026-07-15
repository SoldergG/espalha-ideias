import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { updateCertificacaoAction } from "../../actions";
import { CertificacaoForm } from "../../certificacao-form";

export default async function EditarCertificacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from("certificacoes")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) notFound();

  return (
    <AdminShell title="Editar certificação" backHref="/admin/certificacoes">
      <CertificacaoForm
        action={updateCertificacaoAction.bind(null, id)}
        initialValues={{
          titulo: data.titulo,
          descricao: data.descricao,
          pdf_url: data.pdf_url,
          image_path: data.image_path,
          image_alt: data.image_alt,
        }}
        submitLabel="Guardar alterações"
      />
    </AdminShell>
  );
}
