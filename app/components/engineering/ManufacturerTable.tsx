import type {
  ManufacturerStatistic,
} from "@/app/engineering";


type ManufacturerTableProps = {
  manufacturers:
    ManufacturerStatistic[];

  largestManufacturer?:
    ManufacturerStatistic;

  smallestManufacturer?:
    ManufacturerStatistic;
};


export default function ManufacturerTable({
  manufacturers,
  largestManufacturer,
  smallestManufacturer,
}: ManufacturerTableProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
            Manufacturer Analytics
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            Vehicle Coverage
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {largestManufacturer ? (
            <SummaryBadge
              label="Largest"
              value={`${largestManufacturer.name} (${largestManufacturer.vehicleCount})`}
            />
          ) : null}

          {smallestManufacturer ? (
            <SummaryBadge
              label="Smallest"
              value={`${smallestManufacturer.name} (${smallestManufacturer.vehicleCount})`}
            />
          ) : null}
        </div>
      </div>


      {manufacturers.length >
      0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-left">
                <TableHeader>
                  Manufacturer
                </TableHeader>

                <TableHeader>
                  Vehicles
                </TableHeader>

                <TableHeader>
                  Featured
                </TableHeader>

                <TableHeader>
                  Verified
                </TableHeader>

                <TableHeader>
                  Avg. Atlas Score
                </TableHeader>
              </tr>
            </thead>

            <tbody>
              {manufacturers.map(
                (
                  manufacturer
                ) => (
                  <tr
                    key={
                      manufacturer.name
                    }
                    className="border-b border-zinc-900 last:border-0"
                  >
                    <TableCell strong>
                      {manufacturer.name}
                    </TableCell>

                    <TableCell>
                      {manufacturer.vehicleCount}
                    </TableCell>

                    <TableCell>
                      {manufacturer.featuredCount}
                    </TableCell>

                    <TableCell>
                      {manufacturer.verifiedCount}
                    </TableCell>

                    <TableCell>
                      {manufacturer.averageScore}
                    </TableCell>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-zinc-500">
          No manufacturer data is available.
        </p>
      )}
    </section>
  );
}


function SummaryBadge({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">
      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}


function TableHeader({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <th className="px-4 py-3 text-xs font-black uppercase tracking-wider text-zinc-500 first:pl-0">
      {children}
    </th>
  );
}


function TableCell({
  children,
  strong = false,
}: {
  children:
    React.ReactNode;

  strong?:
    boolean;
}) {
  return (
    <td
      className={`px-4 py-4 text-sm first:pl-0 ${
        strong
          ? "font-bold text-white"
          : "text-zinc-300"
      }`}
    >
      {children}
    </td>
  );
}