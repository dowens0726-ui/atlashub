import { DashboardClient } from "@/app/components/dashboard";
import { AppShell } from "@/app/components/layout";
import Container from "@/app/components/ui/Container";

export default function DashboardPage() {
  return (
    <AppShell>
      <Container className="py-10">
        <DashboardClient />
      </Container>
    </AppShell>
  );
}