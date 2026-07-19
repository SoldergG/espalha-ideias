"use client";

import Link from "next/link";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { deleteNoticiaAction, moveNoticiaAction, toggleNoticiaPublicadoAction } from "./actions";

type NoticiaRowData = {
  id: string;
  titulo: string;
  data_noticia: string | null;
  categoria: string;
  publicado: boolean;
};

export function NoticiaRow({
  noticia,
  isFirst,
  isLast,
}: {
  noticia: NoticiaRowData;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-border bg-paper p-4">
      <div>
        <p className="font-display text-lg text-ink">{noticia.titulo}</p>
        <p className="text-xs text-ink-muted">
          {noticia.data_noticia ?? "sem data"}
          {noticia.categoria === "recrutamento" && " · Recrutamento"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <MoveButtons
          isFirst={isFirst}
          isLast={isLast}
          onMove={(direction) => moveNoticiaAction(noticia.id, direction)}
        />
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-ink-muted">
          <input
            type="checkbox"
            defaultChecked={noticia.publicado}
            onChange={(event) => toggleNoticiaPublicadoAction(noticia.id, event.target.checked)}
          />
          Publicado
        </label>
        <Link
          href={`/admin/noticias/${noticia.id}/editar`}
          className="h-8 border border-border px-3 text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-olive hover:text-olive"
        >
          Editar
        </Link>
        <ConfirmDeleteButton action={() => deleteNoticiaAction(noticia.id)} />
      </div>
    </div>
  );
}
