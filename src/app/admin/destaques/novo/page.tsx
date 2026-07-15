import { AdminShell } from "@/components/admin/AdminShell";
import { createDestaqueAction } from "../actions";
import { DestaqueForm } from "../destaque-form";

export default function NovoDestaquePage() {
  return (
    <AdminShell title="Novo destaque" backHref="/admin/destaques">
      <DestaqueForm
        action={createDestaqueAction}
        initialValues={{
          titulo: "",
          resumo: "",
          data_destaque: null,
          link_href: null,
          image_path: null,
          image_alt: "",
        }}
        submitLabel="Criar destaque"
      />
    </AdminShell>
  );
}
