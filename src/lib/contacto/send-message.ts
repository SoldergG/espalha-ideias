"use server";

import { getContacto } from "@/lib/content/queries";
import { formatarTelemovel, isTelemovelValido, TELEMOVEL_INVALIDO } from "./telemovel";

export type ContactoFormState = {
  success?: boolean;
  error?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function enviarMensagemContacto(
  _prevState: ContactoFormState,
  formData: FormData
): Promise<ContactoFormState> {
  // Honeypot: preenchido por bots, ignorado por humanos.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { success: true };
  }

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();

  if (!nome || !email || !telefone || !mensagem) {
    return { error: "Preencha o nome, o email, o telemóvel e a mensagem." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Introduza um email válido." };
  }
  if (!isTelemovelValido(telefone)) {
    return { error: TELEMOVEL_INVALIDO };
  }
  if (mensagem.length > 5000) {
    return { error: "A mensagem é demasiado longa." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error: "O envio de mensagens não está configurado de momento. Contacte-nos por email ou telefone.",
    };
  }

  let destinatario = process.env.CONTACT_TO_EMAIL;
  if (!destinatario) {
    try {
      destinatario = (await getContacto()).email;
    } catch {
      destinatario = undefined;
    }
  }
  if (!destinatario || !EMAIL_RE.test(destinatario)) {
    return { error: "Não foi possível determinar o destinatário. Tente novamente mais tarde." };
  }

  const remetente = process.env.CONTACT_FROM_EMAIL ?? "Espalha Ideias <onboarding@resend.dev>";

  const telemovel = formatarTelemovel(telefone);

  const linhas = [
    `Nome: ${nome}`,
    `Email: ${email}`,
    `Telemóvel: ${telemovel}`,
    "",
    "Mensagem:",
    mensagem,
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">Novo pedido de contacto</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telemóvel:</strong> ${escapeHtml(telemovel)}</p>
      <p style="margin-top: 16px;"><strong>Mensagem:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(mensagem)}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remetente,
        to: [destinatario],
        reply_to: email,
        subject: `Pedido de contacto — ${nome}`,
        text: linhas.join("\n"),
        html,
      }),
    });

    if (!response.ok) {
      return { error: "Não foi possível enviar a mensagem. Tente novamente dentro de momentos." };
    }
  } catch {
    return { error: "Não foi possível enviar a mensagem. Verifique a ligação e tente novamente." };
  }

  return { success: true };
}
