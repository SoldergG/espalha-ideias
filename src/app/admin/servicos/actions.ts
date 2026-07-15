"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";
import type { ServicoSlug } from "@/lib/content/types";
import type { SectionFormState } from "../hero-sobre/actions";

export async function updateServicoAction(
  slug: ServicoSlug,
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, `servicos/${slug}`);
    const pontos = String(formData.get("pontos") ?? "")
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    const { error } = await supabaseAdmin
      .from("servicos")
      .update({
        titulo: String(formData.get("titulo") ?? ""),
        resumo: String(formData.get("resumo") ?? ""),
        pontos,
        image_alt: String(formData.get("image_alt") ?? ""),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("slug", slug);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/servicos");
  return { success: true };
}
