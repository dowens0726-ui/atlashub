import type { Mission } from "@/app/types/mission";

export const missions: Mission[] = [
  {
    slug: "first-score",
    title: "First Score",
    description:
      "A starter mission focused on planning, driving, and quick decision making.",
    reward: "$5,000",
    difficulty: "Easy",
    category: "Story",
    estimatedTime: "10–15 min",
    recommendedVehicle: "bravado-buffalo",
    recommendedWeapon: "pistol",
    unlocks: ["Safehouse Access", "Street Contacts"],
    atlasTips: [
      "Bring a fast four-door vehicle.",
      "Avoid unnecessary fights to finish faster.",
      "Stock armor before starting.",
    ],
    relatedMissions: ["street-heat", "clean-getaway"],
    image: "/images/missions/first-score.jpg",
    featured: true,
  },
];