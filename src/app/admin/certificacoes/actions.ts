"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";
import { moveRow, type Direction } from "@/lib/content/reorder";
import type { SectionFormState } from "../hero-sobre/actions";

function readCertificacaoFields(formData: FormData) {
  return {
    titulo: String(formData.get("titulo") ?? ""),
    descricao: String(formData.get("descricao") ?? ""),
    pdf_url: String(formData.get("pdf_url") ?? "") || null,
    image_alt: String(formData.get("image_alt") ?? ""),
  };
}

export async function updateCertificacoesIntroAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  const { error } = await supabaseAdmin
    .from("site_config")
    .update({ certificacoes_intro: String(formData.get("certificacoes_intro") ?? "") })
    .eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/certificacoes");
  return { success: true };
}

export async function createCertificacaoAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  let newId: string | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from("certificacoes")
      .insert(readCertificacaoFields(formData))
      .select("id")
      .single();
    if (error) throw error;
    newId = data.id;

    const imageUrl = await uploadImageIfPresent(
      formData.get("image") as File | null,
      `certificacoes/${newId}`
    );
    if (imageUrl) {
      const { error: imgError } = await supabaseAdmin
        .from("certificacoes")
        .update({ image_path: imageUrl })
        .eq("id", newId);
      if (imgError) throw imgError;
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao criar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/certificacoes");
  redirect("/admin/certificacoes");
}

export async function updateCertificacaoAction(
  id: string,
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(
      formData.get("image") as File | null,
      `certificacoes/${id}`
    );
    const { error } = await supabaseAdmin
      .from("certificacoes")
      .update({
        ...readCertificacaoFields(formData),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", id);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/certificacoes");
  return { success: true };
}

export async function deleteCertificacaoAction(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("certificacoes").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/admin/certificacoes");
}

export async function moveCertificacaoAction(id: string, direction: Direction) {
  await requireAdminSession();
  await moveRow("certificacoes", id, direction);
  revalidatePath("/");
  revalidatePath("/admin/certificacoes");
}

export async function toggleCertificacaoPublicadoAction(id: string, publicado: boolean) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("certificacoes").update({ publicado }).eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/admin/certificacoes");
}
