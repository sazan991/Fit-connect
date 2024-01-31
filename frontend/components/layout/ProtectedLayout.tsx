"use client";

import { useUser } from "@/lib/providers/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user?.isLoggedIn) {
      router.push("/signin");
    }
  }, []);
  return (
    user?.isLoggedIn && (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  );
};
export default ProtectedLayout;
