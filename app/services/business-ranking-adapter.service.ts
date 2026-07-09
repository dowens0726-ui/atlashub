import type { Business } from "@/app/types";

export const businessRankingAdapter = {
  getKey: (business: Business) =>
    business.slug,

  getHref: (business: Business) =>
    `/businesses/${business.slug}`,

  getTitle: (business: Business) =>
    business.name,

  getSubtitle: (business: Business) =>
    `${business.category} · ${business.location}`,
};