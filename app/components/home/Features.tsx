import FeatureCard from "../FeatureCard";

const features = [
  {
    title: "⚡ Fast Answers",
    text: "Find exactly what you need without searching through videos or forums.",
  },
  {
    title: "🗺 Interactive Maps",
    text: "Discover vehicles, businesses, collectibles, and hidden locations.",
  },
  {
    title: "🎯 Mission Guides",
    text: "Complete every mission with clear, spoiler-conscious walkthroughs.",
  },
  {
    title: "🚗 Complete Database",
    text: "Every vehicle, weapon, and business in one searchable place.",
  },
  {
    title: "⭐ Track Progress",
    text: "Work toward 100% completion with built-in tracking tools.",
  },
  {
    title: "🚀 Built for Players",
    text: "Everything is designed to get you back into the game faster.",
  },
];

export default function Features() {
  return (
    <section className="border-t border-zinc-800 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Why Atlas?
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.text}
          />
        ))}
      </div>
    </section>
  );
}