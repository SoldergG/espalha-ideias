import { AdminShell } from "@/components/admin/AdminShell";
import { getHero, getSobre } from "@/lib/content/queries";
import { HeroForm, SobreForm } from "./client-forms";

export default async function HeroSobrePage() {
  const [hero, sobre] = await Promise.all([getHero(), getSobre()]);

  return (
    <AdminShell title="Hero & Sobre">
      <div className="flex flex-col gap-8">
        <HeroForm hero={hero} />
        <SobreForm sobre={sobre} />
      </div>
    </AdminShell>
  );
}
