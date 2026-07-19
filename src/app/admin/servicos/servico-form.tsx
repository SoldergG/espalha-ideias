"use client";

import { useActionState, useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Servico, ServicoSlug } from "@/lib/content/types";
import { updateServicoAction } from "./actions";
import type { SectionFormState } from "../hero-sobre/actions";

const initialState: SectionFormState = {};

const TABS: { slug: ServicoSlug; label: string }[] = [
  { slug: "aec", label: "AEC" },
  { slug: "caf", label: "CAF" },
  { slug: "aaaf", label: "AAAF" },
  { slug: "ferias", label: "Férias" },
  { slug: "assistentes", label: "Assistentes Operacionais" },
];

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

function ServicoFormFields({ servico }: { servico: Servico }) {
  const action = updateServicoAction.bind(null, servico.slug);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <div>
        <label className="block text-sm font-medium text-ink">Título</label>
        <input name="titulo" defaultValue={servico.titulo} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Resumo</label>
        <textarea name="resumo" defaultValue={servico.resumo} rows={3} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Pontos (um por linha)</label>
        <textarea
          name="pontos"
          defaultValue={servico.pontos.join("\n")}
          rows={5}
          className={inputClass}
        />
      </div>
      <ImageUploadField name="image" label="Imagem" currentImageSrc={servico.imageSrc} />
      <div>
        <label className="block text-sm font-medium text-ink">Texto alternativo da imagem</label>
        <input name="image_alt" defaultValue={servico.imageAlt} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar"}
      </button>
      {state.error && <p className="text-sm text-orange-dark">{state.error}</p>}
      {state.success && <p className="text-sm text-olive">Guardado.</p>}
    </form>
  );
}

export function ServicosTabs({ servicos }: { servicos: Servico[] }) {
  const [active, setActive] = useState<ServicoSlug>("aec");
  const servico = servicos.find((s) => s.slug === active);

  return (
    <div>
      <div className="flex border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            onClick={() => setActive(tab.slug)}
            className={`h-11 px-5 text-[13px] uppercase tracking-[0.1em] transition-colors ${
              active === tab.slug
                ? "border-b-2 border-olive text-ink"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{servico && <ServicoFormFields key={servico.slug} servico={servico} />}</div>
    </div>
  );
}
