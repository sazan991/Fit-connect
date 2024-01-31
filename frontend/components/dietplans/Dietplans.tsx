"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PredefinedPlans from "./PredefinedPlans";
import NormalDietPlans from "./NormalDietPlans";

const DietPlans = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dietplan" | "template">(
    "dietplan"
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl">List of all dietplans</h2>
        <button onClick={() => router.back()} className="text-primary">
          Back
        </button>
      </div>
      <div className="pt-7.5">
        <div className="flex items-center w-[40%] mx-auto">
          {/** &&, || short circuiting */}
          <button
            className={`border border-r-0 border-darksecond px-3 py-1 basis-[50%] ${
              activeTab == "dietplan" && "bg-primary text-white"
            } `}
            onClick={() => setActiveTab("dietplan")}
          >
            Dietplans
          </button>
          <button
            className={`border border-l-0 border-darksecond px-3 py-1  basis-[50%] ${
              activeTab == "template" && "bg-primary text-white"
            } `}
            onClick={() => setActiveTab("template")}
          >
            Diet Plan Templates
          </button>
        </div>
      </div>
      <div className="pt-6.5">
        {activeTab === "dietplan" && <NormalDietPlans />}
        {activeTab === "template" && <PredefinedPlans />}
      </div>
    </>
  );
};

export default DietPlans;
