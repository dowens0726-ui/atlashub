export type BaseContent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  verified?: boolean;
};