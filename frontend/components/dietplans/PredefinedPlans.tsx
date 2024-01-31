"use client";

import {
  deletePredefinedDietPlan,
  getAllDietPlans,
  getAllPredefinedDietPlan,
} from "@/lib/apis/private/dietplans";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PredefinedPlans = () => {
  const [predefined, setPredefined] = useState<Array<any>>([]);
  const router = useRouter();
  const fetchPredefinedDietPlans = async () => {
    try {
      const response = await getAllPredefinedDietPlan();
      const responseData = await response.json();

      if (response.ok) {
        setPredefined(responseData?.results);
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
    } finally {
    }
  };

  const handleDeletePredefinedPlan = async (id: string) => {
    confirm("Are you sure you want to delete this dietplan?");
    try {
      const response = await deletePredefinedDietPlan(id);
      const responseData = await response.json();
      console.log("diet pan ");
      if (response.status === 204) {
        toast.success("Diet plan deleted successfully!");
        router.refresh();
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
      toast.success("Error while deleting dietplan!!");
    } finally {
    }
  };

  useEffect(() => {
    fetchPredefinedDietPlans();
  }, []);
  return (
    <div className="p-6.5 flex flex-col gap-3 w-[70%] mx-auto">
      <div className="text-end">
        <Link href="/dietplans/add?type=predefined" className="text-primary">
          Add DietPlan Template
        </Link>
      </div>
      {predefined &&
        predefined?.length > 0 &&
        predefined.map((plan) => (
          <div
            key={plan?.id}
            className="flex justify-between items-center py-4 px-2 rounded-md border border-primary"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">{plan?.type?.toUpperCase()}</h3>
              <p className="text-sm">Difficulty: {plan?.difficulty_level}</p>
            </div>
            <p className="flex flex-col items-end">
              Calorie Consumption
              <span className="text-2xl font-bold mt-1">
                {plan?.daily_calorie_consumption}
              </span>
              <div className="flex gap-3 mt-2">
                <button className="text-primary">Edit</button>
                <button
                  className="text-danger"
                  onClick={() => handleDeletePredefinedPlan(plan?.id)}
                >
                  Delete
                </button>
              </div>
            </p>
          </div>
        ))}
    </div>
  );
};

export default PredefinedPlans;
