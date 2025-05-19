import prisma from "@/lib/prisma"

export default async function DashboardPage() {
  const pgs = await prisma.pG.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">PG Listings</h1>
      {pgs.length === 0 ? (
        <p className="text-gray-600">No PGs available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pgs.map((pg) => (
            <li
              key={pg.id}
              className="p-4 border rounded bg-white shadow-sm hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">{pg.pgname}</h2>
              <p className="text-sm text-gray-500">{pg.address}</p>
              <p className="text-sm text-gray-500 mt-1">
                Available for: <strong>{pg.availableFor}</strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">₹{pg.price}/month</p>
              <p className="text-sm text-gray-600 mt-2">
                Facilities: {pg.facilities}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
