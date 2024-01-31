"use client";

import { useUser } from "@/lib/providers/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.isLoggedIn) {
      router.push("/dashboard");
    }
  }, []);
  return !user?.isLoggedIn && <>{children}</>;
};

export default AuthLayout;
