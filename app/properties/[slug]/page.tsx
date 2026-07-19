type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  return (
    <main className="p-8">
      <h1 className="text-4xl font-black">
        {slug}
      </h1>
    </main>
  );
}