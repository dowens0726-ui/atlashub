
import Container from "./components/ui/Container";
import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="flex min-h-screen flex-col items-center justify-center text-center">

        <div className="text-8xl">🧭</div>

        <h1 className="mt-8 text-6xl font-black">
          404
        </h1>

        <p className="mt-4 text-2xl font-semibold">
          Looks like you&apos;re off the map.
        </p>

        <p className="mt-4 max-w-xl text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist...
          but Atlas can still help you find your way.
        </p>

        <div className="mt-10">
          <Button href="/">
            Return Home
          </Button>
        </div>

      </Container>
    </main>
  );
}