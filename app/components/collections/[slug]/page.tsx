import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Collection"
          title={slug}
          description="Collection detail page coming next."
        />
      </Container>
    </main>
  );
}