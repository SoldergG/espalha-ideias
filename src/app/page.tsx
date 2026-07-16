import { getSiteContent } from "@/lib/content/queries";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Sobre } from "@/components/landing/Sobre";
import { Servicos } from "@/components/landing/Servicos";
import { Destaques } from "@/components/landing/Destaques";
import { Certificacoes } from "@/components/landing/Certificacoes";
import { Contacto } from "@/components/landing/Contacto";
import { Footer } from "@/components/landing/Footer";

export const revalidate = 60;

export default async function Home() {
  const siteContent = await getSiteContent();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero content={siteContent.hero} />
        <Sobre content={siteContent.sobre} />
        <Servicos servicos={siteContent.servicos} />
        <Destaques destaques={siteContent.destaques} />
        <Certificacoes
          intro={siteContent.certificacoesIntro}
          certificacoes={siteContent.certificacoes}
        />
        <Contacto content={siteContent.contacto} />
      </main>
      <Footer
        facebookUrl={siteContent.contacto.facebookUrl}
        linkedinUrl={siteContent.contacto.linkedinUrl}
        pessoasContacto={siteContent.contacto.pessoasContacto}
      />
    </div>
  );
}
