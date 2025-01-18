import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      {children}
      <Toaster />
    </main>
  );
}
