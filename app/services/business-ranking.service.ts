import { businesses } from "@/app/data";
import type { Business } from "@/app/types";
import { getBusinessScore } from "./scoring.service";

function sortDescending(
  selector: (business: Business) => number
): Business[] {
  return [...businesses].sort(
    (a, b) => selector(b) - selector(a)
  );
}

export function getBestOverallBusinesses(
  limit = 10
): Business[] {
  return sortDescending(
    (business) =>
      getBusinessScore(business).overall
  ).slice(0, limit);
}

export function getMostProfitableBusinesses(
  limit = 10
): Business[] {
  return sortDescending(
    (business) =>
      getBusinessScore(business).profitability
  ).slice(0, limit);
}

export function getBestSoloBusinesses(
  limit = 10
): Business[] {
  return sortDescending(
    (business) =>
      getBusinessScore(business).solo
  ).slice(0, limit);
}

export function getBestBeginnerBusinesses(
  limit = 10
): Business[] {
  return sortDescending(
    (business) =>
      getBusinessScore(business).beginner
  ).slice(0, limit);
}

export function getBestProgressionBusinesses(
  limit = 10
): Business[] {
  return sortDescending(
    (business) =>
      getBusinessScore(business).progression
  ).slice(0, limit);
}