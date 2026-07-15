"use client";

import { useActionState } from "react";
import { updateCertificacoesIntroAction } from "./actions";
import type { SectionFormState } from "../hero-sobre/actions";

const initialState: SectionFormState = {};

export function IntroForm({ intro }: { intro: string }) {
  const [state, action, pending] = useActionState(updateCertificacoesIntroAction, initialState);

  return (
    <form action={action} className="mb-6 border border-border bg-paper p-6">
      <label className="block text-sm font-medium text-ink">Texto introdutório (parágrafo legal)</label>
      <textarea
        name="certificacoes_intro"
        defaultValue={intro}
        rows={3}
        className="mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft"
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-3 flex h-10 w-fit items-center justify-center bg-olive px-5 text-xs font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar texto"}
      </button>
      {state.error && <p className="mt-2 text-sm text-orange-dark">{state.error}</p>}
      {state.success && <p className="mt-2 text-sm text-olive">Guardado.</p>}
    </form>
  );
}
