import Sidebar from "@/components/Sidebar";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Puzzle PG Properties",
  description:
    "Explore a curated list of PG accommodations available near you with Puzzle PG.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? verifyJwt(token) : null;

  if (!user) redirect("/");

  return (
    <section className="flex-grow bg-gray-50">
      <div
        className="min-h-64 flex justify-center items-center bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'linear-gradient(270deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) 101.02%), url("https://puzzlesliving.org/wp-content/uploads/2025/02/Daily-Trivia.jpg")',
        }}
      >
        <h1 className="text-5xl font-bold text-white">Properties</h1>
      </div>

      <div className="p-6 flex">
        <Sidebar/>       
        {children}
      </div>
    </section>
  );
}
