export type BaseEntity = {
  id: string;
  slug: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  verified?: boolean;
};