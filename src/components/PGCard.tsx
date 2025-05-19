"use client"

type PGCardProps = {
  pgname: string
  address: string
  availableFor: "Boys" | "Girls" | "All"
  price: number
  oldPrice?: number
  facilities: string[]
  area:string
}

type BadgeProps = {
  area: string;
};

const areaColors: Record<string, string> = {
  Andheri: 'bg-blue-500 text-white',
  Bandra: 'bg-pink-500 text-white',
  Hinjewadi: 'bg-purple-600 text-white',
  Wakad: 'bg-orange-500 text-white',
  Baner: 'bg-emerald-600 text-white',
  Kothrud: 'bg-yellow-500 text-black',
};

function Badge({ area }: BadgeProps) {
  const badgeStyle = areaColors[area] || 'bg-gray-400 text-white';

  return (
    <div
      className={`rounded-tl-[7px] absolute top-0 left-0 py-[2px] px-4 text-xs font-semibold rounded-br-md ${badgeStyle}`}
    >
      {area}
    </div>
  );
}

export default function PGCard({
  pgname,
  address,
  availableFor,
  price,
  oldPrice,
  facilities,
  area
}: PGCardProps) {
  const genderIcons =
    availableFor === "All" ? (
      <>
        <img src="/icons/boys.svg" alt="Boys" className="w-[20px] h-[20px]" />
        <img src="/icons/girls.svg" alt="Girls" className="w-[20px] h-[20px]" />
      </>
    ) : (
      <img
        src={`/icons/${availableFor.toLowerCase()}.svg`}
        alt={availableFor}
        className="w-[20px] h-[20px]"
      />
    )

  return (
    <div className="relative w-full flex flex-col md:flex-row justify-between items-start gap-6 p-8 rounded-lg border bg-white shadow-sm hover:shadow-md transition-all">

      <Badge area={area}/>
      <div className="space-y-3 flex-1 w-full">
        <h2 className="text-lg font-bold">{pgname}</h2>

        <div className="flex gap-2 text-sm text-gray-500">
          <img
            src="/icons/location.svg"
            alt="Location"
            className="w-[20px] h-[20px] mt-1"
          />
          <span>{address}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {facilities.map((facility, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
              <p className="text-sm text-gray-700">{facility}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
          {genderIcons}
          <span>{availableFor}</span>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-2 w-full md:w-auto">
        <div>
          <p className="text-xs text-gray-400">Monthly</p>
          <p>
            <span className="text-lg font-bold text-blue-600">₹{price}</span>
            {oldPrice && (
              <span className="line-through text-sm text-gray-400 ml-2">
                ₹{oldPrice}
              </span>
            )}
          </p>
        </div>

        <div className="text-red-500 text-sm font-semibold">
          Free cancellation
          <p className="text-xs text-gray-500 -mt-1">before 30 days</p>
        </div>

        <button className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 text-sm font-semibold transition">
          Check Availability →
        </button>
      </div>
    </div>
  )
}
