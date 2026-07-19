-- Reversões de conteúdo, 20 de julho de 2026. Correr no SQL editor do Supabase.
-- Cada bloco é independente: corre só o que precisares.

-- ---------------------------------------------------------------------------
-- 1. Hero e "Quem somos", antes da abertura da área de Artes & Cultura
-- ---------------------------------------------------------------------------
update public.hero set
  kicker = 'Desde 2001',
  headline = 'Atividades que dão sentido ao tempo livre',
  subheadline = 'Gerimos enriquecimento curricular, apoio à família e programas de férias em escolas e autarquias de todo o país.'
where id = 1;

update public.sobre set
  texto_intro = 'A Espalha Ideias desenvolve atividades de animação e tempos livres para crianças e jovens desde 2001. A nossa equipa técnico-pedagógica tem larga experiência na gestão de atividades de enriquecimento curricular, prolongamento de horário e apoio à família.',
  texto_objetivos = 'Desde o primeiro dia que nos preocupamos em proporcionar um tempo livre de qualidade. Somos parceiros na implementação do conceito de escola a tempo inteiro.',
  texto_metodo = 'Com as nossas Soluções Integradas de Prolongamento Escolar, trabalhamos com autarquias, associações de pais e agrupamentos escolares para garantir:'
where id = 1;

-- ---------------------------------------------------------------------------
-- 2. Encarregados de Educação, antes da mudança para o Portal Ei!
--    A coluna ficha_inscricao_url foi eliminada; se a quiseres de volta,
--    corre primeiro o ALTER TABLE e só depois o UPDATE.
-- ---------------------------------------------------------------------------
-- alter table public.encarregados_educacao
--   add column ficha_inscricao_url text not null default '';

update public.encarregados_educacao set
  texto = 'Se é encarregado de educação de um aluno que frequenta um estabelecimento de ensino onde a Espalha Ideias desenvolve atividades, pode aceder aos dados do seu educando através do portal Educa. Se ainda não fez a inscrição, descarregue a ficha, preencha e envie-nos devidamente assinada.',
  portal_url = 'https://educa.espalhaideias.pt/educa-ee/'
  -- , ficha_inscricao_url = '/documents/ficha-inscricao-caf.pdf'
where id = 1;

-- ---------------------------------------------------------------------------
-- 3. Colunas de servicos eliminadas por não serem usadas (estavam todas vazias)
-- ---------------------------------------------------------------------------
-- alter table public.servicos add column descricao text not null default '';
-- alter table public.servicos add column cta_label text not null default '';
-- alter table public.servicos add column cta_href text not null default '';
