"use client";

import Link from "next/link";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { deleteDestaqueAction, moveDestaqueAction, toggleDestaquePublicadoAction } from "./actions";

type DestaqueRowData = {
  id: string;
  titulo: string;
  data_destaque: string | null;
  publicado: boolean;
};

export function DestaqueRow({
  destaque,
  isFirst,
  isLast,
}: {
  destaque: DestaqueRowData;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-border bg-paper p-4">
      <div>
        <p className="font-display text-lg text-ink">{destaque.titulo}</p>
        <p className="text-xs text-ink-muted">{destaque.data_destaque ?? "sem data"}</p>
      </div>
      <div className="flex items-center gap-4">
        <MoveButtons
          isFirst={isFirst}
          isLast={isLast}
          onMove={(direction) => moveDestaqueAction(destaque.id, direction)}
        />
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-ink-muted">
          <input
            type="checkbox"
            defaultChecked={destaque.publicado}
            onChange={(event) => toggleDestaquePublicadoAction(destaque.id, event.target.checked)}
          />
          Publicado
        </label>
        <Link
          href={`/admin/destaques/${destaque.id}/editar`}
          className="h-8 border border-border px-3 text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-olive hover:text-olive"
        >
          Editar
        </Link>
        <ConfirmDeleteButton action={() => deleteDestaqueAction(destaque.id)} />
      </div>
    </div>
  );
}
