import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

const roadmap = [
  {
    version: "Sprint 1.2",
    status: "In Progress",
    color: "text-yellow-400",
    goals: [
      "Feedback Modal",
      "Feedback Email Integration",
      "Beta Polish",
    ],
  },
  {
    version: "Sprint 1.3",
    status: "Next",
    color: "text-blue-400",
    goals: [
      "Mission Database",
      "Mission Detail Pages",
      "Mission Search",
    ],
  },
  {
    version: "Sprint 1.4",
    status: "Planned",
    color: "text-purple-400",
    goals: [
      "Favorites",
      "Saved Comparisons",
      "Local Storage",
    ],
  },
  {
    version: "Version 1.0",
    status: "Launch",
    color: "text-emerald-400",
    goals: [
      "Interactive Map",
      "Google Analytics",
      "SEO",
      "Public Release",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas"
          title="Development Roadmap"
          description="The journey to becoming the ultimate GTA VI companion."
        />

        <div className="mt-12 space-y-8">
          {roadmap.map((sprint) => (
            <div
              key={sprint.version}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">
                  {sprint.version}
                </h2>

                <span className={`font-semibold ${sprint.color}`}>
                  {sprint.status}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {sprint.goals.map((goal) => (
                  <li key={goal} className="text-zinc-300">
                    ✅ {goal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}