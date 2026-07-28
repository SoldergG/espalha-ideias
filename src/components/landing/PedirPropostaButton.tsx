"use client";

import { useState } from "react";
import { ContactoModal } from "./ContactoModal";

/**
 * Botão "Pedir proposta" da secção Contacto — réplica do CTA do cabeçalho:
 * abre o mesmo modal de pedido de contacto.
 */
export function PedirPropostaButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex h-12 items-center bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
      >
        Pedir proposta
      </button>
      <ContactoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
