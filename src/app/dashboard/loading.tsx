export default function Loading() {
  return (
    <div className="flex-grow flex justify-center items-center p-6 bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    </div>
  )
}
