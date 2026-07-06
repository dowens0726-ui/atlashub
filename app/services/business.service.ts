import { businesses } from "@/app/data";
import type { Business } from "@/app/types";

export function getBusinesses(): Business[] {
  return businesses;
}

export function getBusiness(slug: string): Business | undefined {
  return businesses.find((business) => business.slug === slug);
}

export function getBusinessesByCategory(
  category: Business["category"]
): Business[] {
  return businesses.filter((business) => business.category === category);
}

export function getSoloFriendlyBusinesses(): Business[] {
  return businesses.filter((business) => business.soloFriendly);
}

export function getCrewBusinesses(): Business[] {
  return businesses.filter((business) => business.crewRecommended);
}

export function getTopIncomeBusinesses(limit = 5): Business[] {
  return [...businesses]
    .sort((a, b) => b.incomePotential - a.incomePotential)
    .slice(0, limit);
}