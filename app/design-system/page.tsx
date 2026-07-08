import { AppShell } from "@/app/components/layout";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function DesignSystemPage() {
  return (
    <AppShell>
      <Container className="py-10">
        <PageHeader
          eyebrow="Internal"
          title="Atlas Design System"
          description="Living style guide for AtlasHub."
        />
      </Container>
    </AppShell>
  );
}