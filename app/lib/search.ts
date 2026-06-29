import { searchItems } from "../data/searchItems";

export function search(query: string) {
  if (!query.trim()) return [];

  return searchItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
}