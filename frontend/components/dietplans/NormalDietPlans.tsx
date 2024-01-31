"use client";
import {
  deleteDietPlan,
  getAllDietPlans,
  getAllPredefinedDietPlan,
} from "@/lib/apis/private/dietplans";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NormalDietPlans = () => {
  const [dietplans, setDietPlans] = useState<Array<any>>([]);
  const router = useRouter();
  const fetchDietPlans = async () => {
    try {
      const response = await getAllDietPlans();
      const responseData = await response.json();

      if (response.ok) {
        setDietPlans(responseData?.results);
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
    } finally {
    }
  };

  const handleDeleteDietPlan = async (id: string) => {
    confirm("Are you sure you want to delete this dietplan?");
    try {
      const response = await deleteDietPlan(id);
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Diet plan deleted successfully!");
        router.refresh();
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
      toast.error("Error while deleting dietplan!!");
    } finally {
    }
  };
  useEffect(() => {
    fetchDietPlans();
  }, []);
  return (
    <div className="p-6.5 flex flex-col gap-3 w-[70%] mx-auto">
      <div className="text-end">
        <Link href="/dietplans/add" className="text-primary">
          Add New Diet Plan
        </Link>
      </div>
      {dietplans &&
        dietplans?.length > 0 &&
        dietplans.map((plan) => (
          <div
            key={plan?.id}
            className="flex items-center pr-2 border border-success rounded-md"
          >
            <div className="bg-success w-[8%] py-4 self-stretch flex items-center justify-center flex-wrap rounded-tl-md rounded-bl-md">
              <span className="rotate-[270deg] inline-block whitespace-nowrap text-white uppercase">
                {plan?.template?.type}
              </span>
            </div>
            <div className="flex flex-1 pl-3 py-5 flex-col gap-2">
              <h3 className="text-xl">{plan?.name?.toUpperCase()}</h3>
              {/* <p className="text-sm">Difficulty: {plan?.difficulty_level}</p> */}
            </div>
            <p className="flex flex-col py-5 items-end">
              Target Calorie Consumption
              <span className="text-2xl font-bold">{plan?.target_calorie}</span>
              <div className="flex gap-3 mt-2">
                <button className="text-primary">Edit</button>
                <button
                  className="text-danger"
                  onClick={() => handleDeleteDietPlan(plan?.id)}
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

export default NormalDietPlans;
