import { AdminShell } from "@/components/admin/AdminShell";
import { createNoticiaAction } from "../actions";
import { NoticiaForm } from "../noticia-form";

export default function NovaNoticiaPage() {
  return (
    <AdminShell title="Nova notícia" backHref="/admin/noticias">
      <NoticiaForm
        action={createNoticiaAction}
        initialValues={{
          titulo: "",
          slug: "",
          resumo: "",
          corpo: "",
          anexo_texto: null,
          data_noticia: null,
          categoria: "institucional",
          image_path: null,
          image_alt: "",
        }}
        submitLabel="Criar notícia"
      />
    </AdminShell>
  );
}
