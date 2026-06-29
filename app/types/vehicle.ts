export type Vehicle = {
  slug: string;
  name: string;
  manufacturer: string;
  class: string;
  image: string;
  price: number;
  topSpeed: number;
  acceleration: number;
  handling: number;
  braking: number;
  drivetrain: "RWD" | "FWD" | "AWD";
  seats: number;
  location: string;
  description: string;
  featured: boolean;
  
};