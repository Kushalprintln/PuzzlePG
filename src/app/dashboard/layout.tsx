import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    <section className="min-h-screen p-6 bg-gray-50">
      {/* Header could go here */}
      {children}
    </section>
  );
}
