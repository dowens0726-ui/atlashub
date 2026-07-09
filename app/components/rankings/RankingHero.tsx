import {
  HeroBanner,
  HeroMetrics,
} from "@/app/components/design-system";

type RankingHeroProps = {
  totalRankings: number;
  totalCategories: number;
};

export default function RankingHero({
  totalRankings,
  totalCategories,
}: RankingHeroProps) {
  return (
    <HeroBanner
      eyebrow="Atlas Intelligence"
      title="Atlas Rankings"
      subtitle="AI-powered leaderboards built from Atlas scoring systems. Compare vehicles, businesses, weapons, and future content through one unified ranking engine."
    >
      <HeroMetrics
        metrics={[
          {
            label: "Ranking Systems",
            value: `${totalRankings}`,
          },
          {
            label: "Categories",
            value: `${totalCategories}`,
          },
          {
            label: "Powered By",
            value: "Atlas Score",
          },
        ]}
        columns={3}
      />
    </HeroBanner>
  );
}