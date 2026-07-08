import { ProfileClient } from "@/app/components/profile";
import { AppShell } from "@/app/components/layout";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function ProfilePage() {
  return (
    <AppShell>
      <Container className="py-10">
        <PageHeader
          eyebrow="Atlas Empire"
          title="Empire"
          description="Manage your budget, play style, and owned content."
        />

        <ProfileClient />
      </Container>
    </AppShell>
  );
}