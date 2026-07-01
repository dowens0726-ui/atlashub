"use client";

import { useRouter } from "next/navigation";
import CompareSelector from "./CompareSelector";

type Option = {
  label: string;
  value: string;
};

type Props = {
  vehicle: string;
  compareWith: string;
  options: Option[];
};

export default function CompareVehicleSelector({
  vehicle,
  compareWith,
  options,
}: Props) {
  const router = useRouter();

  return (
    <CompareSelector
      value={compareWith}
      options={options}
      onChange={(value) => {
        router.push(`/compare?vehicle=${vehicle}&compareWith=${value}`);
      }}
    />
  );
}