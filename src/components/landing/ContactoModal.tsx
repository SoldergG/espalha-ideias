"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { enviarMensagemContacto, type ContactoFormState } from "@/lib/contacto/send-message";
import { isTelemovelValido, TELEMOVEL_INVALIDO } from "@/lib/contacto/telemovel";

const initialState: ContactoFormState = {};

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

export function ContactoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, action, pending] = useActionState(enviarMensagemContacto, initialState);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [erroTelemovel, setErroTelemovel] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  // Renderizado no <body>: o <header> tem backdrop-blur, e backdrop-filter cria
  // um bloco de contenção que prendia este "fixed" à caixa do cabeçalho.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contacto-modal-title"
    >
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 my-auto max-h-full w-full max-w-lg overflow-y-auto border border-border bg-paper shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 id="contacto-modal-title" className="font-display text-xl text-ink">
            Pedido de contacto
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-ink"
          >
            <X size={20} weight="light" />
          </button>
        </div>

        {state.success ? (
          <div className="px-6 py-10 text-center">
            <p className="font-display text-lg text-ink">Mensagem enviada.</p>
            <p className="mt-2 text-sm text-ink-muted">
              Obrigado pelo seu contacto. Entraremos em contacto o mais breve possível.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form action={action} className="flex flex-col gap-4 px-6 py-6">
            <p className="text-sm leading-relaxed text-ink-muted">
              Escolas, autarquias, instituições culturais e famílias: envie-nos uma mensagem e
              responderemos com uma proposta adaptada à sua realidade.
            </p>

            {/* Honeypot anti-spam — escondido dos utilizadores */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contacto-nome" className="block text-sm font-medium text-ink">
                  Nome
                </label>
                <input
                  ref={firstFieldRef}
                  id="contacto-nome"
                  name="nome"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contacto-telefone" className="block text-sm font-medium text-ink">
                  Telemóvel
                </label>
                <input
                  id="contacto-telefone"
                  name="telefone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="912 345 678"
                  aria-invalid={erroTelemovel ? true : undefined}
                  aria-describedby={erroTelemovel ? "contacto-telefone-erro" : undefined}
                  onBlur={(event) => {
                    const valor = event.target.value.trim();
                    setErroTelemovel(!valor || isTelemovelValido(valor) ? null : TELEMOVEL_INVALIDO);
                  }}
                  onChange={() => erroTelemovel && setErroTelemovel(null)}
                  className={`${inputClass} ${erroTelemovel ? "border-orange-dark" : ""}`}
                />
                {erroTelemovel && (
                  <p id="contacto-telefone-erro" className="mt-1.5 text-xs text-orange-dark">
                    {erroTelemovel}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contacto-email" className="block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="contacto-email"
                name="email"
                type="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contacto-mensagem" className="block text-sm font-medium text-ink">
                Mensagem
              </label>
              <textarea
                id="contacto-mensagem"
                name="mensagem"
                required
                rows={5}
                className={inputClass}
              />
            </div>

            {state.error && <p className="text-sm text-orange-dark">{state.error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="mt-1 inline-flex h-12 items-center justify-center bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream disabled:opacity-60"
            >
              {pending ? "A enviar…" : "Enviar mensagem"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
