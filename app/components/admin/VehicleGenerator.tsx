"use client";

import { useMemo, useState } from "react";
import FormField from "./FormField";
import GeneratedCode from "./GeneratedCode";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function VehicleGenerator() {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [price, setPrice] = useState("0");
  const [topSpeed, setTopSpeed] = useState("0");
  const [acceleration, setAcceleration] = useState("0");
  const [handling, setHandling] = useState("0");
  const [braking, setBraking] = useState("0");
  const [description, setDescription] = useState("");

  const generatedCode = useMemo(() => {
    if (!name.trim()) {
      return "// Fill out the form to generate a vehicle object.";
    }

    const slug = slugify(name);

    return `createVehicle({
  slug: "${slug}",
  name: "${name}",
  manufacturer: "${manufacturer}",
  class: "${vehicleClass}",
  image: "/vehicles/${slug}.jpg",
  price: ${Number(price)},
  topSpeed: ${Number(topSpeed)},
  acceleration: ${Number(acceleration)},
  handling: ${Number(handling)},
  braking: ${Number(braking)},
  drivetrain: "RWD",
  seats: 2,
  location: "",
  description: "${description}",
  featured: false,
  tags: [],
}),`;
  }, [
    name,
    manufacturer,
    vehicleClass,
    price,
    topSpeed,
    acceleration,
    handling,
    braking,
    description,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <FormField
          label="Vehicle Name"
          value={name}
          onChange={setName}
        />

        <FormField
          label="Manufacturer"
          value={manufacturer}
          onChange={setManufacturer}
        />

        <FormField
          label="Vehicle Class"
          value={vehicleClass}
          onChange={setVehicleClass}
        />

        <FormField
          label="Price"
          type="number"
          value={price}
          onChange={setPrice}
        />

        <FormField
          label="Top Speed"
          type="number"
          value={topSpeed}
          onChange={setTopSpeed}
        />

        <FormField
          label="Acceleration"
          type="number"
          value={acceleration}
          onChange={setAcceleration}
        />

        <FormField
          label="Handling"
          type="number"
          value={handling}
          onChange={setHandling}
        />

        <FormField
          label="Braking"
          type="number"
          value={braking}
          onChange={setBraking}
        />

        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={setDescription}
        />
      </div>

      <GeneratedCode code={generatedCode} />
    </div>
  );
}