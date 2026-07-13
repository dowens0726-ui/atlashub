import {
  BulkImport,
} from "@/app/components/admin";

import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";


export default function ImportPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container
        size="wide"
        className="py-16"
      >
        <PageHeader
          eyebrow="Atlas Content Studio"
          title="Bulk Vehicle Import"
          description="Paste CSV or JSON vehicle data, validate every row, detect duplicate slugs, and generate Atlas-compatible vehicle objects."
        />

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <BulkImport />
        </div>
      </Container>
    </main>
  );
}