export type ContentVerificationStatus =
  | "Official"
  | "Observed"
  | "Legacy"
  | "Community"
  | "Unknown";

export type ContentVerification = {
  status: ContentVerificationStatus;

  confirmedBy?: string;

  sourceUrl?: string;

  lastVerifiedAt?: string;

  notes?: string[];
};