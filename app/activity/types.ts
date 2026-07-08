export type ActivityType =
  | "profile.updated"
  | "business.owned"
  | "business.removed"
  | "cash.updated"
  | "recommendation.updated"
  | "empire.updated";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
};