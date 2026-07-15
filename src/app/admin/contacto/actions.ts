"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { SectionFormState } from "../hero-sobre/actions";

export async function updateContactoAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const transporte = String(formData.get("transporte") ?? "")
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    const pessoasContacto = String(formData.get("pessoas_contacto") ?? "")
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    const { error } = await supabaseAdmin
      .from("contacto")
      .update({
        morada_linha1: String(formData.get("morada_linha1") ?? ""),
        morada_linha2: String(formData.get("morada_linha2") ?? ""),
        morada_linha3: String(formData.get("morada_linha3") ?? ""),
        telefone: String(formData.get("telefone") ?? ""),
        email: String(formData.get("email") ?? ""),
        facebook_url: String(formData.get("facebook_url") ?? ""),
        linkedin_url: String(formData.get("linkedin_url") ?? ""),
        google_maps_url: String(formData.get("google_maps_url") ?? ""),
        transporte,
        pessoas_contacto: pessoasContacto,
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/contacto");
  return { success: true };
}
