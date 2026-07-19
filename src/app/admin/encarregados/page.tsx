import { AdminShell } from "@/components/admin/AdminShell";
import { getEncarregadosEducacao } from "@/lib/content/queries";
import { EncarregadosForm } from "./client-form";

export default async function EncarregadosAdminPage() {
  const info = await getEncarregadosEducacao();

  return (
    <AdminShell title="Encarregados de Educação">
      <EncarregadosForm info={info} />
    </AdminShell>
  );
}
