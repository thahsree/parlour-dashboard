"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  console.log(user, "user from PR");
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  // While checking auth status, don't render anything yet
  if (isLoading) return <p>Loading...</p>;

  // If user is still not available after loading, block access
  if (!user) return null;

  return <>{children}</>;
}
