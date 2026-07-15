"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";

export type SectionFormState = { error?: string; success?: boolean };

export async function updateHeroAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, "hero");

    const { error } = await supabaseAdmin
      .from("hero")
      .update({
        kicker: String(formData.get("kicker") ?? ""),
        headline: String(formData.get("headline") ?? ""),
        subheadline: String(formData.get("subheadline") ?? ""),
        cta_label: String(formData.get("cta_label") ?? ""),
        cta_href: String(formData.get("cta_href") ?? ""),
        image_alt: String(formData.get("image_alt") ?? ""),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-sobre");
  return { success: true };
}

export async function updateSobreAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, "sobre");
    const pontosMetodo = String(formData.get("pontos_metodo") ?? "")
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    const { error } = await supabaseAdmin
      .from("sobre")
      .update({
        titulo: String(formData.get("titulo") ?? ""),
        texto_intro: String(formData.get("texto_intro") ?? ""),
        texto_objetivos: String(formData.get("texto_objetivos") ?? ""),
        texto_metodo: String(formData.get("texto_metodo") ?? ""),
        pontos_metodo: pontosMetodo,
        ano_fundacao: Number(formData.get("ano_fundacao")) || 2001,
        image_alt: String(formData.get("image_alt") ?? ""),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-sobre");
  return { success: true };
}
