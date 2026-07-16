import { getContacto } from "@/lib/content/queries";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const revalidate = 60;

export default async function PaginasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contacto = await getContacto();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer
        facebookUrl={contacto.facebookUrl}
        linkedinUrl={contacto.linkedinUrl}
        pessoasContacto={contacto.pessoasContacto}
      />
    </div>
  );
}
