import type {
  ContentVerification,
} from "./verification";

export type BaseEntity = {
  id: string;
  slug: string;
  description: string;

  image?: string;
  featured?: boolean;
  tags?: string[];

  createdAt?: string;
  updatedAt?: string;

  /**
   * Legacy verification flag retained for compatibility with existing data,
   * filters, analytics, and UI components.
   */
  verified?: boolean;

  /**
   * Structured content verification used for source transparency,
   * evidence tracking, and GTA VI confirmation status.
   */
  verification?: ContentVerification;
};