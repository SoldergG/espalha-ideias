export type Hero = {
  kicker: string;
  headline: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type Sobre = {
  titulo: string;
  textoIntro: string;
  textoObjetivos: string;
  textoMetodo: string;
  pontosMetodo: string[];
  anoFundacao: number;
  imageSrc: string;
  imageAlt: string;
};

export type ServicoArea = "educacao" | "artes-cultura";

/** Free-form: slugs live in the database, not in a closed union here. */
export type ServicoSlug = string;

export type Servico = {
  slug: ServicoSlug;
  area: ServicoArea;
  titulo: string;
  resumo: string;
  pontos: string[];
  imageSrc: string;
  imageAlt: string;
};

export type Destaque = {
  id: string;
  titulo: string;
  resumo: string;
  dataDestaque: string;
  imageSrc: string;
  imageAlt: string;
};

export type Certificacao = {
  id: string;
  titulo: string;
  descricao: string;
  imageSrc: string;
  imageAlt: string;
  pdfUrl: string | null;
};

export type Contacto = {
  moradaLinha1: string;
  moradaLinha2: string;
  moradaLinha3: string;
  telefone: string;
  email: string;
  facebookUrl: string;
  linkedinUrl: string;
  googleMapsEmbedUrl: string;
  transporte: string[];
  pessoasContacto: string[];
};

export type NoticiaCategoria = "institucional" | "recrutamento";

export type NoticiaResumo = {
  slug: string;
  titulo: string;
  resumo: string;
  dataNoticia: string;
  imageSrc: string | null;
  imageAlt: string | null;
  categoria: NoticiaCategoria;
};

export type Noticia = NoticiaResumo & {
  corpo: string;
  anexoTexto: string | null;
};

export type EncarregadosEducacao = {
  texto: string;
  portalUrl: string;
  fichaInscricaoUrl: string;
};

export type SiteContent = {
  hero: Hero;
  sobre: Sobre;
  servicos: Servico[];
  destaques: Destaque[];
  certificacoesIntro: string;
  certificacoes: Certificacao[];
  contacto: Contacto;
};
