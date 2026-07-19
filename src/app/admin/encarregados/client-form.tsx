"use client";

import { useActionState } from "react";
import type { EncarregadosEducacao } from "@/lib/content/types";
import { updateEncarregadosAction } from "./actions";
import type { SectionFormState } from "../hero-sobre/actions";

const initialState: SectionFormState = {};

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

export function EncarregadosForm({ info }: { info: EncarregadosEducacao }) {
  const [state, action, pending] = useActionState(updateEncarregadosAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <div>
        <label className="block text-sm font-medium text-ink">Texto da página</label>
        <textarea name="texto" defaultValue={info.texto} rows={5} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">
          Endereço do Portal Ei! (destino do botão)
        </label>
        <input name="portal_url" defaultValue={info.portalUrl} className={inputClass} />
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
