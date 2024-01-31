"use client";

import { addGoal } from "@/lib/apis/private/goals";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface GoalFormModel {
  name: string;
  description: string;
  type: string;
  time_duration: number;
  is_completed: boolean;
  status: string;
  date_start: string;
  date_completed: string;
}

const GoalForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<GoalFormModel>({
    defaultValues: {
      name: "",
      description: "",
      type: "",
      time_duration: 0,
      is_completed: false,
      status: "",
      date_start: "",
      date_completed: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const createGoal = async (data: GoalFormModel) => {
    setLoading(true);
    try {
      const response = await addGoal(data);
      const responseData = await response.json();
      console.log("responsedata", responseData);
      if (response.ok) {
        toast.success("Goal added successfully!!");
        router.push("/dashboard");
      } else {
        throw "Error";
      }
    } catch (error) {
      toast.error("OOps!! Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(dietplan)}>
      <h2 className="text-xl mb-12">Create Dietplan</h2>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-3 block text-black dark:text-white">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">Type</label>
          <input
            {...register("type")}
            type="text"
            placeholder="Default Input"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Time duration
          </label>
          <input
            {...register("time_duration")}
            type="number"
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-3 h-full">
          <label className="block text-black dark:text-white">
            Is completed
          </label>
          <input type="checkbox" className="" {...register("is_completed")} />
        </div>
        <div className="">
          <label className="block text-black dark:text-white">Status</label>
          <input
            {...register("status")}
            type="text"
            required
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="">
          <label className="block text-black dark:text-white">Start Date</label>
          <input
            {...register("date_start")}
            type="date"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="">
          <label className="block text-black dark:text-white">End Date</label>
          <input
            {...register("date_completed")}
            type="date"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={6}
            placeholder="Default textarea"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
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
      <div></div>
    </form>
  );
};

export default DietPlanForm;
