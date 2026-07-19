"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { SectionFormState } from "../hero-sobre/actions";

export async function updateEncarregadosAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const { error } = await supabaseAdmin
      .from("encarregados_educacao")
      .update({
        texto: String(formData.get("texto") ?? ""),
        portal_url: String(formData.get("portal_url") ?? ""),
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/encarregados-educacao");
  revalidatePath("/admin/encarregados");
  return { success: true };
}
