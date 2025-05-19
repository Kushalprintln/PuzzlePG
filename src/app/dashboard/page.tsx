import PGCard from "@/components/PGCard";
import prisma from "@/lib/prisma";
import Pagination from "@/components/Pagination";

type SearchParams = {
  gender?: string[] | string;
  sort?: "asc" | "desc";
  area?: string;
  page?: string;
  search?: string;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const take = 10;
  const skip = (page - 1) * take;

  const filters: any = {};

  if (searchParams.gender) {
    const genderArray = Array.isArray(searchParams.gender)
      ? searchParams.gender
      : [searchParams.gender];

    filters.availableFor = { in: genderArray };
  }

  if (searchParams.area) {
    filters.address = { contains: searchParams.area };
  }

  if (searchParams.search) {
    filters.OR = [
      { pgname: { contains: searchParams.search, mode: "insensitive" } },
      { address: { contains: searchParams.search, mode: "insensitive" } },
      { area: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  const orderBy =
    searchParams.sort === "asc" || searchParams.sort === "desc"
      ? { price: searchParams.sort as "asc" | "desc" }
      : { createdAt: "desc" as const };

  const [pgs, total] = await Promise.all([
    prisma.pG.findMany({
      where: filters,
      orderBy,
      skip,
      take,
    }),
    prisma.pG.count({ where: filters }),
  ]);

  const totalPages = Math.ceil(total / take);

  return (
    <div className="py-4 px-6 flex-grow">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight mb-6">
        Comfortable & Affordable PG Accommodation
      </h1>

      {pgs.length === 0 ? (
        <p className="text-gray-600">No PGs available.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4">
            {pgs.map((pg) => (
              <li key={pg.id}>
                <PGCard
                  pgname={pg.pgname}
                  address={pg.address}
                  availableFor={pg.availableFor as "Boys" | "Girls" | "All"}
                  price={pg.price}
                  oldPrice={pg.price + 3000}
                  facilities={pg.facilities}
                  area={pg.area}
                />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}
