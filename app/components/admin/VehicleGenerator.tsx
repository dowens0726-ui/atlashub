"use client";

import { useMemo, useState } from "react";
import FormField from "./FormField";
import GeneratedCode from "./GeneratedCode";

const manufacturers = [
  "Benefactor",
  "Bravado",
  "Dewbauchee",
  "Grotti",
  "Karin",
  "Ocelot",
  "Pegassi",
  "Pfister",
  "Truffade",
  "Übermacht",
];

const vehicleClasses = [
  "Super",
  "Sports",
  "Muscle",
  "SUV",
  "Motorcycle",
  "Off-Road",
  "Sedan",
  "Coupe",
  "Compact",
  "Van",
  "Boat",
  "Aircraft",
];

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

export default function VehicleGenerator() {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState(manufacturers[0]);
  const [vehicleClass, setVehicleClass] = useState(vehicleClasses[0]);
  const [price, setPrice] = useState("0");
  const [topSpeed, setTopSpeed] = useState("0");
  const [acceleration, setAcceleration] = useState("0");
  const [handling, setHandling] = useState("0");
  const [braking, setBraking] = useState("0");
  const [drivetrain, setDrivetrain] = useState("RWD");
  const [seats, setSeats] = useState("2");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const slug = useMemo(() => slugify(name), [name]);
  const imagePath = slug ? `/vehicles/${slug}.jpg` : "/vehicles/example.jpg";
  const parsedTags = useMemo(() => parseTags(tags), [tags]);

  const generatedCode = useMemo(() => {
    if (!name.trim()) {
      return "// Fill out the form to generate a vehicle object.";
    }

    return `createVehicle({
  slug: "${slug}",
  name: "${name}",
  manufacturer: "${manufacturer}",
  class: "${vehicleClass}",
  image: "${imagePath}",
  price: ${Number(price)},
  topSpeed: ${Number(topSpeed)},
  acceleration: ${Number(acceleration)},
  handling: ${Number(handling)},
  braking: ${Number(braking)},
  drivetrain: "${drivetrain}",
  seats: ${Number(seats)},
  location: "${location}",
  description: "${description}",
  featured: false,
  tags: ${JSON.stringify(parsedTags)},
}),`;
  }, [
    name,
    slug,
    manufacturer,
    vehicleClass,
    imagePath,
    price,
    topSpeed,
    acceleration,
    handling,
    braking,
    drivetrain,
    seats,
    location,
    description,
    parsedTags,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <FormField label="Vehicle Name" value={name} onChange={setName} />

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">
              Manufacturer
            </span>

            <select
              value={manufacturer}
              onChange={(event) => setManufacturer(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
            >
              {manufacturers.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">
              Vehicle Class
            </span>

            <select
              value={vehicleClass}
              onChange={(event) => setVehicleClass(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
            >
              {vehicleClasses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Price" type="number" value={price} onChange={setPrice} />
          <FormField label="Top Speed" type="number" value={topSpeed} onChange={setTopSpeed} />
          <FormField label="Acceleration" type="number" value={acceleration} onChange={setAcceleration} />
          <FormField label="Handling" type="number" value={handling} onChange={setHandling} />
          <FormField label="Braking" type="number" value={braking} onChange={setBraking} />
          <FormField label="Seats" type="number" value={seats} onChange={setSeats} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">
              Drivetrain
            </span>

            <select
              value={drivetrain}
              onChange={(event) => setDrivetrain(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
            >
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </label>

          <FormField
            label="Location"
            value={location}
            onChange={setLocation}
            placeholder="Legendary Motorsport"
          />
        </div>

        <FormField
          label="Tags"
          value={tags}
          onChange={setTags}
          placeholder="super, awd, hypercar"
        />

        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={setDescription}
        />
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <h3 className="font-bold text-white">Live Preview</h3>

          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
              {vehicleClass}
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {name || "Vehicle Name"}
            </h2>

            <p className="mt-2 text-zinc-400">
              {manufacturer}
            </p>

            <div className="mt-5 grid gap-3 text-sm text-zinc-300">
              <p>Slug: {slug || "vehicle-slug"}</p>
              <p>Image: {imagePath}</p>
              <p>Price: ${Number(price).toLocaleString()}</p>
              <p>Tags: {parsedTags.length ? parsedTags.join(", ") : "none"}</p>
            </div>
          </div>
        </div>

        <GeneratedCode code={generatedCode} />
      </div>
    </div>
  );
}