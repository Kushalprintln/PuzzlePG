import Link from "next/link";
import Image from "next/image";
import puzzleIcon from '../../public/puzzleImg.png'

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="flex flex-col items-center space-y-6">
        <Image src={puzzleIcon} alt="PuzzlePG Logo" width={80} height={80} />
        <h1 className="text-4xl font-bold text-blue-600">404 – Page Not Found</h1>
        <p className="text-gray-600 text-lg">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
