import type {
  Vehicle,
  Business,
} from "@/app/types";

export const vehicleRankingAdapter = {
  getKey: (vehicle: Vehicle) =>
    vehicle.slug,

  getHref: (vehicle: Vehicle) =>
    `/vehicles/${vehicle.slug}`,

  getTitle: (vehicle: Vehicle) =>
    vehicle.name,

  getSubtitle: (vehicle: Vehicle) =>
    `${vehicle.manufacturer} · ${vehicle.class}`,
};


export const businessRankingAdapter = {
  getKey: (business: Business) =>
    business.slug,

  getHref: (business: Business) =>
    `/data/businesses/${business.slug}`,

  getTitle: (business: Business) =>
    business.name,

  getSubtitle: (business: Business) =>
    `${business.category} · ${business.location}`,
};