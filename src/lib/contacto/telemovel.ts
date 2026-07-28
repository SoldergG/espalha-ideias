/**
 * Validação de telemóveis portugueses.
 *
 * Aceita indicativo (+351 / 00351 / 351) e separadores comuns, porque as
 * pessoas escrevem o número de muitas formas. Os telemóveis nacionais têm
 * nove dígitos e começam por 91, 92, 93 ou 96.
 *
 * Isto confirma o formato, não a posse do número.
 */
const PT_MOBILE = /^9[1236]\d{7}$/;

/** Remove indicativo e separadores, devolvendo só os nove dígitos. */
export function normalizarTelemovel(valor: string): string {
  const digitos = valor.replace(/[\s.\-()/]/g, "").replace(/^\+/, "");
  if (digitos.startsWith("00351")) return digitos.slice(5);
  if (digitos.startsWith("351")) return digitos.slice(3);
  return digitos;
}

export function isTelemovelValido(valor: string): boolean {
  return PT_MOBILE.test(normalizarTelemovel(valor));
}

/** Formata para apresentação: "912 345 678". */
export function formatarTelemovel(valor: string): string {
  const n = normalizarTelemovel(valor);
  if (!PT_MOBILE.test(n)) return valor;
  return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
}

export const TELEMOVEL_INVALIDO =
  "Introduza um telemóvel português válido (9 dígitos, começado por 91, 92, 93 ou 96).";

/**
 * Contacto telefónico português — mais abrangente que o telemóvel: aceita
 * também números fixos (começados por 2) e nómadas/VoIP (começados por 3).
 * São sempre nove dígitos.
 */
const PT_TELEFONE = /^(9[1236]|2\d|3\d)\d{7}$/;

export function isTelefoneValido(valor: string): boolean {
  return PT_TELEFONE.test(normalizarTelemovel(valor));
}

/** Formata para apresentação em grupos de três: "210 123 456". */
export function formatarTelefone(valor: string): string {
  const n = normalizarTelemovel(valor);
  if (!PT_TELEFONE.test(n)) return valor;
  return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
}

export const TELEFONE_INVALIDO =
  "Introduza um contacto telefónico português válido (9 dígitos).";
