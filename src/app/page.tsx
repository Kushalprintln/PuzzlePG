import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="flex-grow bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://puzzlesliving.org/wp-content/uploads/2025/02/1-2.jpg")',
      }}
    ></main>
  );
}
