import { supabasePublic } from "@/lib/supabase/public";
import type {
  Certificacao,
  Contacto,
  Destaque,
  Hero,
  Servico,
  ServicoSlug,
  SiteContent,
  Sobre,
} from "./types";

function assertRow<T>(row: T | null, label: string): T {
  if (!row) {
    throw new Error(`Conteúdo em falta na base de dados: ${label}`);
  }
  return row;
}

export async function getHero(): Promise<Hero> {
  const { data, error } = await supabasePublic.from("hero").select("*").eq("id", 1).single();
  if (error) throw error;
  const row = assertRow(data, "hero");
  return {
    kicker: row.kicker,
    headline: row.headline,
    subheadline: row.subheadline,
    ctaPrimaryLabel: row.cta_label,
    ctaPrimaryHref: row.cta_href,
    ctaSecondaryLabel: "Ver serviços",
    ctaSecondaryHref: "#servicos",
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  };
}

export async function getSobre(): Promise<Sobre> {
  const { data, error } = await supabasePublic.from("sobre").select("*").eq("id", 1).single();
  if (error) throw error;
  const row = assertRow(data, "sobre");
  return {
    titulo: row.titulo,
    textoIntro: row.texto_intro,
    textoObjetivos: row.texto_objetivos,
    textoMetodo: row.texto_metodo,
    pontosMetodo: row.pontos_metodo ?? [],
    anoFundacao: row.ano_fundacao,
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  };
}

export async function getServicos(): Promise<Servico[]> {
  const { data, error } = await supabasePublic
    .from("servicos")
    .select("*")
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    slug: row.slug as ServicoSlug,
    titulo: row.titulo,
    resumo: row.resumo,
    pontos: row.pontos ?? [],
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  }));
}

function formatDataDestaque(isoDate: string | null): string {
  if (!isoDate) return "";
  const formatted = new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

async function getDestaquesPublicados(): Promise<Destaque[]> {
  const { data, error } = await supabasePublic
    .from("destaques")
    .select("*")
    .eq("publicado", true)
    .order("ordem", { ascending: true })
    .order("data_destaque", { ascending: false })
    .limit(4);
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    titulo: row.titulo,
    resumo: row.resumo,
    dataDestaque: formatDataDestaque(row.data_destaque),
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  }));
}

async function getCertificacoes(): Promise<{ intro: string; certificacoes: Certificacao[] }> {
  const [{ data: configRow, error: configError }, { data: certRows, error: certError }] =
    await Promise.all([
      supabasePublic.from("site_config").select("certificacoes_intro").eq("id", 1).single(),
      supabasePublic
        .from("certificacoes")
        .select("*")
        .eq("publicado", true)
        .order("ordem", { ascending: true }),
    ]);
  if (configError) throw configError;
  if (certError) throw certError;

  return {
    intro: assertRow(configRow, "site_config").certificacoes_intro,
    certificacoes: (certRows ?? []).map((row) => ({
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      imageSrc: row.image_path,
      imageAlt: row.image_alt,
      pdfUrl: row.pdf_url,
    })),
  };
}

export async function getContacto(): Promise<Contacto> {
  const { data, error } = await supabasePublic.from("contacto").select("*").eq("id", 1).single();
  if (error) throw error;
  const row = assertRow(data, "contacto");
  return {
    moradaLinha1: row.morada_linha1,
    moradaLinha2: row.morada_linha2,
    moradaLinha3: row.morada_linha3,
    telefone: row.telefone,
    email: row.email,
    facebookUrl: row.facebook_url,
    linkedinUrl: row.linkedin_url,
    googleMapsEmbedUrl: row.google_maps_url,
    transporte: row.transporte ?? [],
    pessoasContacto: row.pessoas_contacto ?? [],
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const [hero, sobre, servicos, destaques, { intro, certificacoes }, contacto] =
    await Promise.all([
      getHero(),
      getSobre(),
      getServicos(),
      getDestaquesPublicados(),
      getCertificacoes(),
      getContacto(),
    ]);

  return {
    hero,
    sobre,
    servicos,
    destaques,
    certificacoesIntro: intro,
    certificacoes,
    contacto,
  };
}
