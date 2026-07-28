"use server";

import { formatarTelefone, isTelefoneValido, TELEFONE_INVALIDO } from "./telemovel";

export type ContactoFormState = {
  success?: boolean;
  error?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Destinatário dos pedidos. Pode ser sobreposto por env; por omissão é o
// endereço oficial pedido.
const DESTINATARIO_PADRAO = "espalha@espalhaideias.pt";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function enviarEmail(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
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
  const entidade = String(formData.get("entidade") ?? "").trim(); // opcional
  const assunto = String(formData.get("assunto") ?? "").trim();
  const motivos = String(formData.get("motivos") ?? "").trim();

  if (!nome || !email || !telefone || !assunto || !motivos) {
    return { error: "Preencha o nome, o email, o contacto telefónico, o assunto e os motivos do contacto." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Introduza um email válido." };
  }
  if (!isTelefoneValido(telefone)) {
    return { error: TELEFONE_INVALIDO };
  }
  if (assunto.length > 200) {
    return { error: "O assunto é demasiado longo." };
  }
  if (motivos.length > 5000) {
    return { error: "Os motivos do contacto são demasiado longos." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error: "O envio de mensagens não está configurado de momento. Contacte-nos por email ou telefone.",
    };
  }

  const destinatario = process.env.CONTACT_TO_EMAIL ?? DESTINATARIO_PADRAO;
  if (!EMAIL_RE.test(destinatario)) {
    return { error: "Não foi possível determinar o destinatário. Tente novamente mais tarde." };
  }

  const remetente = process.env.CONTACT_FROM_EMAIL ?? "Espalha Ideias <onboarding@resend.dev>";
  const telefoneFmt = formatarTelefone(telefone);

  // Linhas comuns aos dois emails (interno e confirmação).
  const detalhes = [
    `Nome: ${nome}`,
    `Email: ${email}`,
    `Contacto telefónico: ${telefoneFmt}`,
    ...(entidade ? [`Entidade: ${entidade}`] : []),
    `Assunto: ${assunto}`,
    "",
    "Motivos do contacto:",
    motivos,
  ];

  const detalhesHtml = `
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Contacto telefónico:</strong> ${escapeHtml(telefoneFmt)}</p>
    ${entidade ? `<p><strong>Entidade:</strong> ${escapeHtml(entidade)}</p>` : ""}
    <p><strong>Assunto:</strong> ${escapeHtml(assunto)}</p>
    <p style="margin-top: 16px;"><strong>Motivos do contacto:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(motivos)}</p>
  `;

  // 1) Email para a Espalha Ideias — o assunto do pedido é o assunto do email.
  const okInterno = await enviarEmail(apiKey, {
    from: remetente,
    to: [destinatario],
    reply_to: email,
    subject: assunto,
    text: detalhes.join("\n"),
    html: `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">Novo pedido de contacto</h2>${detalhesHtml}</div>`,
  });

  if (!okInterno) {
    return { error: "Não foi possível enviar a mensagem. Tente novamente dentro de momentos." };
  }

  // 2) Confirmação para o remetente. Best-effort: se falhar (ex.: domínio do
  // Resend não verificado para destinatários externos), o pedido já foi
  // recebido, por isso não bloqueia o sucesso.
  await enviarEmail(apiKey, {
    from: remetente,
    to: [email],
    reply_to: destinatario,
    subject: `Recebemos o seu pedido de contacto — ${assunto}`,
    text: [
      `Olá ${nome},`,
      "",
      "Recebemos o seu pedido de contacto e entraremos em contacto o mais breve possível.",
      "",
      "Resumo do que nos enviou:",
      "",
      ...detalhes,
      "",
      "Espalha Ideias",
    ].join("\n"),
    html: `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a;">
      <p>Olá ${escapeHtml(nome)},</p>
      <p>Recebemos o seu pedido de contacto e entraremos em contacto o mais breve possível.</p>
      <p style="margin-top: 16px;"><strong>Resumo do que nos enviou:</strong></p>
      ${detalhesHtml}
      <p style="margin-top: 16px;">Espalha Ideias</p></div>`,
  });

  return { success: true };
}
