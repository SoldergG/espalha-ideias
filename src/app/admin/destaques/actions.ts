"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";
import type { SectionFormState } from "../hero-sobre/actions";

function readDestaqueFields(formData: FormData) {
  return {
    titulo: String(formData.get("titulo") ?? ""),
    resumo: String(formData.get("resumo") ?? ""),
    data_destaque: String(formData.get("data_destaque") ?? "") || null,
    link_href: String(formData.get("link_href") ?? "") || null,
    image_alt: String(formData.get("image_alt") ?? ""),
  };
}

export async function createDestaqueAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  let newId: string | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from("destaques")
      .insert(readDestaqueFields(formData))
      .select("id")
      .single();
    if (error) throw error;
    newId = data.id;

    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, `destaques/${newId}`);
    if (imageUrl) {
      const { error: imgError } = await supabaseAdmin
        .from("destaques")
        .update({ image_path: imageUrl })
        .eq("id", newId);
      if (imgError) throw imgError;
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao criar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/destaques");
  redirect("/admin/destaques");
}

export async function updateDestaqueAction(
  id: string,
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, `destaques/${id}`);
    const { error } = await supabaseAdmin
      .from("destaques")
      .update({
        ...readDestaqueFields(formData),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", id);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/destaques");
  return { success: true };
}

export async function deleteDestaqueAction(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("destaques").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/admin/destaques");
}

export async function toggleDestaquePublicadoAction(id: string, publicado: boolean) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("destaques").update({ publicado }).eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/admin/destaques");
}
