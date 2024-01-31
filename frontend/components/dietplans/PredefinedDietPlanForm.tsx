"use client";
import {
  addDietPlan,
  addPredefinedDietPlan,
  getAllPredefinedDietPlan,
} from "@/lib/apis/private/dietplans";
import { getAllGoals } from "@/lib/apis/private/goals";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCaretDown } from "react-icons/bi";
import { toast } from "react-toastify";

interface PreDefinedModel {
  type: string;
  difficulty_level: string;
  daily_calorie_consumption: string;
}

[];
const PredefinedDietPlanForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [goals, setGoals] = useState<Array<any>>([]);
  const [predefined, setPredefined] = useState<Array<any>>([]);
  const u_key = useId();
  const methods = useForm<PreDefinedModel>({
    defaultValues: {
      type: "",
      difficulty_level: "",
      daily_calorie_consumption: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const createPredefinedDietPlan = async (data: PreDefinedModel) => {
    setLoading(true);
    try {
      const response = await addPredefinedDietPlan(data);
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Diet template added successfully!!");
        router.push("/dietplans");
      } else {
        throw "Error";
      }
    } catch (err) {
      toast.error("OOps!! Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(createPredefinedDietPlan)}>
      <h2 className="text-xl mb-12">Add Diet Plan Template</h2>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-3 block text-black dark:text-white">Type</label>
          <input
            {...register("type")}
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Difficulty Level
          </label>
          <input
            {...register("difficulty_level")}
            type="text"
            placeholder="Target calorie"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Daily Calorie Consumption
          </label>
          <input
            {...register("daily_calorie_consumption")}
            type="text"
            placeholder="Target calorie"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>
        <div className="col-span-full text-end">
          <button
            type="button"
            className="mr-2 cursor-pointer rounded-lg border border-darksecond bg-whiter py-4 px-7 text-black transition hover:bg-opacity-90 disabled:cursor-not-allowed"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            value="Submit"
            className="cursor-pointer rounded-lg border border-primary bg-primary py-4 px-7 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed"
          >
            {loading ? "Submiting...." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PredefinedDietPlanForm;
