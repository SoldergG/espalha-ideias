import { AdminShell } from "@/components/admin/AdminShell";
import { createCertificacaoAction } from "../actions";
import { CertificacaoForm } from "../certificacao-form";

export default function NovaCertificacaoPage() {
  return (
    <AdminShell title="Nova certificação" backHref="/admin/certificacoes">
      <CertificacaoForm
        action={createCertificacaoAction}
        initialValues={{ titulo: "", descricao: "", pdf_url: null, image_path: null, image_alt: "" }}
        submitLabel="Criar certificação"
      />
    </AdminShell>
  );
}
