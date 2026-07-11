import Link from "next/link";

const onboardingBenefits = [
  {
    title: "Personalized Strategy",
    description:
      "Atlas will tailor missions, businesses, vehicles, and progression recommendations to the way you play.",
  },
  {
    title: "Smarter Priorities",
    description:
      "Your goals will shape what Atlas recommends first, helping you avoid wasted time and money.",
  },
  {
    title: "A Living Player Identity",
    description:
      "Your Atlas identity will evolve as your empire, collection, and GTA VI journey grow.",
  },
];

const onboardingSteps = [
  "Choose your playstyle",
  "Select your goals",
  "Create your Atlas identity",
];

export default function OnboardingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_62%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
              Atlas Player Setup
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">
              Your AI Companion for GTA VI
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Atlas
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300 sm:text-2xl">
              Build a personalized GTA VI strategy around your playstyle,
              priorities, and long-term goals.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              Answer a few questions and Atlas will create your player identity,
              recommend your best starting focus, and prepare a dashboard built
              around the way you want to play.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/onboarding/playstyle"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-7 py-3 text-base font-bold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Begin Player Setup
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-7 py-3 text-base font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Return to Dashboard
              </Link>
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Setup takes less than two minutes. Your choices can be updated
              later.
            </p>
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Atlas Initialization
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Create your player identity
                </h2>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-xl font-black text-emerald-300">
                A
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {onboardingSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-black text-emerald-300">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-100">{step}</p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {index === 0 &&
                        "Tell Atlas how you plan to approach GTA VI."}

                      {index === 1 &&
                        "Choose the outcomes that matter most to you."}

                      {index === 2 &&
                        "Receive your personalized identity and focus."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {onboardingBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
                >
                  <h3 className="font-bold text-zinc-100">{benefit.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <p className="text-sm font-semibold text-emerald-300">
                Spend Less Time Searching. More Time Playing.
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Atlas turns your answers into actionable recommendations across
                missions, businesses, vehicles, exploration, and progression.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}