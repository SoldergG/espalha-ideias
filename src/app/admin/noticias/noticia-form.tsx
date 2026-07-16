"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { SectionFormState } from "../hero-sobre/actions";

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

export type NoticiaFormValues = {
  titulo: string;
  slug: string;
  resumo: string;
  corpo: string;
  anexo_texto: string | null;
  data_noticia: string | null;
  categoria: string;
  image_path: string | null;
  image_alt: string;
};

export function NoticiaForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (state: SectionFormState, formData: FormData) => Promise<SectionFormState>;
  initialValues: NoticiaFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <div>
        <label className="block text-sm font-medium text-ink">Título</label>
        <input name="titulo" defaultValue={initialValues.titulo} className={inputClass} required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-ink">Slug (opcional)</label>
          <input
            name="slug"
            defaultValue={initialValues.slug}
            placeholder="gerado a partir do título"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Data</label>
          <input
            name="data_noticia"
            type="date"
            defaultValue={initialValues.data_noticia ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Categoria</label>
          <select name="categoria" defaultValue={initialValues.categoria} className={inputClass}>
            <option value="institucional">Institucional</option>
            <option value="recrutamento">Recrutamento</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Resumo</label>
        <textarea name="resumo" defaultValue={initialValues.resumo} rows={2} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Corpo (parágrafos separados por linha em branco)</label>
        <textarea name="corpo" defaultValue={initialValues.corpo} rows={10} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Documentos e ligações (opcional)</label>
        <textarea
          name="anexo_texto"
          defaultValue={initialValues.anexo_texto ?? ""}
          rows={2}
          className={inputClass}
        />
      </div>
      <ImageUploadField name="image" label="Imagem" currentImageSrc={initialValues.image_path} />
      <div>
        <label className="block text-sm font-medium text-ink">Texto alternativo da imagem</label>
        <input name="image_alt" defaultValue={initialValues.image_alt} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : submitLabel}
      </button>
      {state.error && <p className="text-sm text-orange-dark">{state.error}</p>}
      {state.success && <p className="text-sm text-olive">Guardado.</p>}
    </form>
  );
}
