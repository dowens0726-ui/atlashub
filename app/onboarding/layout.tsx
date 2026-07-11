import type { ReactNode } from "react";

import OnboardingProvider from "@/app/components/onboarding/OnboardingProvider";

type OnboardingLayoutProps = {
  children: ReactNode;
};

export default function OnboardingLayout({
  children,
}: OnboardingLayoutProps) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}