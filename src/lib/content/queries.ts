import { supabasePublic } from "@/lib/supabase/public";
import type {
  Certificacao,
  Contacto,
  Destaque,
  EncarregadosEducacao,
  Hero,
  Noticia,
  NoticiaResumo,
  Servico,
  ServicoArea,
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

export async function getServicos(area?: ServicoArea): Promise<Servico[]> {
  let query = supabasePublic.from("servicos").select("*");
  if (area) query = query.eq("area", area);
  const { data, error } = await query.order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    slug: row.slug as ServicoSlug,
    area: row.area as ServicoArea,
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

function formatDataNoticia(isoDate: string): string {
  const formatted = new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
  return formatted;
}

export async function getNoticias(): Promise<NoticiaResumo[]> {
  const { data, error } = await supabasePublic
    .from("noticias")
    .select("titulo, slug, resumo, data_noticia, image_path, image_alt, categoria")
    .eq("publicado", true)
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    titulo: row.titulo,
    slug: row.slug,
    resumo: row.resumo,
    dataNoticia: formatDataNoticia(row.data_noticia),
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
    categoria: row.categoria,
  }));
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const { data, error } = await supabasePublic
    .from("noticias")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();
  if (error) return null;
  return {
    titulo: data.titulo,
    slug: data.slug,
    resumo: data.resumo,
    corpo: data.corpo,
    anexoTexto: data.anexo_texto,
    dataNoticia: formatDataNoticia(data.data_noticia),
    imageSrc: data.image_path,
    imageAlt: data.image_alt,
    categoria: data.categoria,
  };
}

export async function getEncarregadosEducacao(): Promise<EncarregadosEducacao> {
  const { data, error } = await supabasePublic
    .from("encarregados_educacao")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const row = assertRow(data, "encarregados_educacao");
  return {
    texto: row.texto,
    portalUrl: row.portal_url,
    fichaInscricaoUrl: row.ficha_inscricao_url,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const [hero, sobre, servicos, destaques, { intro, certificacoes }, contacto] =
    await Promise.all([
      getHero(),
      getSobre(),
      getServicos("educacao"),
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
