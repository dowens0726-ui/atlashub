import { PlayerProfile } from "@/app/components/profile";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { defaultPlayerProfile } from "@/app/services";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Profile"
          title="Player Profile"
          description="Personalize Atlas with your budget, play style, and owned content."
        />

        <div className="mt-10">
          <PlayerProfile profile={defaultPlayerProfile} />
        </div>
      </Container>
    </main>
  );
}