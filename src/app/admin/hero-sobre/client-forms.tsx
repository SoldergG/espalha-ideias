"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Hero, Sobre } from "@/lib/content/types";
import { updateHeroAction, updateSobreAction, type SectionFormState } from "./actions";

const initialState: SectionFormState = {};

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}

function FormStatus({ state }: { state: SectionFormState }) {
  if (state.error) return <p className="mt-3 text-sm text-orange-dark">{state.error}</p>;
  if (state.success) return <p className="mt-3 text-sm text-olive">Guardado.</p>;
  return null;
}

export function HeroForm({ hero }: { hero: Hero }) {
  const [state, action, pending] = useActionState(updateHeroAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <h2 className="font-display text-xl text-ink">Hero</h2>

      <Field label="Kicker (texto pequeno acima do título)">
        <input name="kicker" defaultValue={hero.kicker} className={inputClass} />
      </Field>
      <Field label="Título">
        <textarea name="headline" defaultValue={hero.headline} rows={2} className={inputClass} />
      </Field>
      <Field label="Subtítulo">
        <textarea name="subheadline" defaultValue={hero.subheadline} rows={3} className={inputClass} />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Texto do botão principal">
          <input name="cta_label" defaultValue={hero.ctaPrimaryLabel} className={inputClass} />
        </Field>
        <Field label="Destino do botão (ex.: #contacto)">
          <input name="cta_href" defaultValue={hero.ctaPrimaryHref} className={inputClass} />
        </Field>
      </div>
      <ImageUploadField name="image" label="Imagem" currentImageSrc={hero.imageSrc} />
      <Field label="Texto alternativo da imagem">
        <input name="image_alt" defaultValue={hero.imageAlt} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar Hero"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}

export function SobreForm({ sobre }: { sobre: Sobre }) {
  const [state, action, pending] = useActionState(updateSobreAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <h2 className="font-display text-xl text-ink">Sobre / Quem Somos</h2>

      <Field label="Título da secção">
        <input name="titulo" defaultValue={sobre.titulo} className={inputClass} />
      </Field>
      <Field label="Texto de introdução">
        <textarea name="texto_intro" defaultValue={sobre.textoIntro} rows={3} className={inputClass} />
      </Field>
      <Field label="Objetivos">
        <textarea
          name="texto_objetivos"
          defaultValue={sobre.textoObjetivos}
          rows={3}
          className={inputClass}
        />
      </Field>
      <Field label="Introdução ao método (frase antes da lista)">
        <textarea name="texto_metodo" defaultValue={sobre.textoMetodo} rows={2} className={inputClass} />
      </Field>
      <Field label="Pontos do método (um por linha)">
        <textarea
          name="pontos_metodo"
          defaultValue={sobre.pontosMetodo.join("\n")}
          rows={4}
          className={inputClass}
        />
      </Field>
      <Field label="Ano de fundação">
        <input
          name="ano_fundacao"
          type="number"
          defaultValue={sobre.anoFundacao}
          className={`${inputClass} max-w-[10rem]`}
        />
      </Field>
      <ImageUploadField name="image" label="Imagem" currentImageSrc={sobre.imageSrc} />
      <Field label="Texto alternativo da imagem">
        <input name="image_alt" defaultValue={sobre.imageAlt} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar Sobre"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}
