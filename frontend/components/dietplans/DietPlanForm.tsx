"use client";
import {
  addDietPlan,
  getAllPredefinedDietPlan,
} from "@/lib/apis/private/dietplans";
import { getAllGoals } from "@/lib/apis/private/goals";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCaretDown } from "react-icons/bi";
import { toast } from "react-toastify";

interface DietPlanModel {
  name: string;
  template_id: string;
  goal: string;
  target_calorie: string;
}
const DietPlanForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [goals, setGoals] = useState<Array<any>>([]);
  const [predefined, setPredefined] = useState<Array<any>>([]);
  const u_key = useId();
  const methods = useForm<DietPlanModel>({
    defaultValues: {
      name: "",
      target_calorie: "",
      template_id: "",
      goal: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const fetchGoals = async () => {
    try {
      const response = await getAllGoals();
      const responseData = await response.json();

      if (response.ok) {
        setGoals(responseData?.results);
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
    } finally {
    }
  };

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

  const createDietPlan = async (data: DietPlanModel) => {
    setLoading(true);
    try {
      const response = await addDietPlan(data);
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Dietplan added successfully!!");
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

  useEffect(() => {
    fetchGoals();
    fetchPredefinedDietPlans();
  }, []);

  return (
    <form onSubmit={handleSubmit(createDietPlan)}>
      <h2 className="text-xl mb-12">Create Diet Plan</h2>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Diet Plan Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Target Calorie
          </label>
          <input
            {...register("target_calorie")}
            type="text"
            placeholder="Target calorie"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Select Goal
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              {...register("goal")}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="" disabled>
                Select goal
              </option>
              {goals &&
                goals?.length > 0 &&
                goals?.map((goal) => (
                  <option key={u_key + goal?.id} value={goal?.id}>
                    {goal?.name}
                  </option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <BiCaretDown />
            </span>
          </div>
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Select Dietplan Template
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              {...register("template_id")}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="" disabled>
                Select template
              </option>
              {predefined &&
                predefined?.length > 0 &&
                predefined?.map((plan) => (
                  <option key={u_key + plan?.id + plan?.type} value={plan?.id}>
                    {plan?.type}
                  </option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <BiCaretDown />
            </span>
          </div>
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

export default DietPlanForm;
