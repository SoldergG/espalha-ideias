"use client";

import Link from "next/link";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import {
  deleteCertificacaoAction,
  moveCertificacaoAction,
  toggleCertificacaoPublicadoAction,
} from "./actions";

type CertificacaoRowData = {
  id: string;
  titulo: string;
  publicado: boolean;
};

export function CertificacaoRow({
  certificacao,
  isFirst,
  isLast,
}: {
  certificacao: CertificacaoRowData;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-border bg-paper p-4">
      <p className="font-display text-lg text-ink">{certificacao.titulo}</p>
      <div className="flex items-center gap-4">
        <MoveButtons
          isFirst={isFirst}
          isLast={isLast}
          onMove={(direction) => moveCertificacaoAction(certificacao.id, direction)}
        />
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-ink-muted">
          <input
            type="checkbox"
            defaultChecked={certificacao.publicado}
            onChange={(event) => toggleCertificacaoPublicadoAction(certificacao.id, event.target.checked)}
          />
          Publicado
        </label>
        <Link
          href={`/admin/certificacoes/${certificacao.id}/editar`}
          className="h-8 border border-border px-3 text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-olive hover:text-olive"
        >
          Editar
        </Link>
        <ConfirmDeleteButton action={() => deleteCertificacaoAction(certificacao.id)} />
      </div>
    </div>
  );
}
