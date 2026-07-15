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

export type ServicoSlug = "aec" | "caf" | "ferias";

export type Servico = {
  slug: ServicoSlug;
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
  googleMapsEmbedUrl: string;
  transporte: string[];
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
