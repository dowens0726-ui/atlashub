export type Mission = {
  slug: string;
  title: string;
  description: string;
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Story Mission" | "Heist";
};
