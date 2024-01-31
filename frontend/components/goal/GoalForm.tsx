"use client";

import { addGoal, getGoalById, updateGoal } from "@/lib/apis/private/goals";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const getDateFormatted = (arg: string) => {
  const date = new Date(arg);
  //2024-01-17
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const GoalForm = ({ edit }: { edit: boolean }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [goalDetail, setGoalDetail] = useState<any>();
  const params = useParams();
  // const goal_id = params["goal_id"];
  const goal_id = params.goal_id;
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
    setValue,
    formState: { errors },
  } = methods;

  const createGoal = async (data: GoalFormModel) => {
    setLoading(true);
    try {
      if (!edit) {
        const response = await addGoal(data);
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Goal added successfully!!");
          router.push("/goal");
        } else {
          throw "Error";
        }
      } else {
        const response = await updateGoal(data, goal_id);
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Goal updated successfully!!");
          router.push("/goal");
        } else {
          throw "Error";
        }
      }
    } catch (error) {
      toast.error("OOps!! Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  const getGoal = async (id: string | string[]) => {
    try {
      const response = await getGoalById(id);
      const responseData = await response.json();
      if (response.ok) {
        setValue("name", responseData?.name);
        setValue("type", responseData?.type);
        setValue("time_duration", responseData?.time_duration);
        setValue("is_completed", responseData?.is_completed);
        setValue("status", responseData?.status);
        setValue("date_start", getDateFormatted(responseData?.date_start));
        //2024-01-10
        setValue(
          "date_completed",
          getDateFormatted(responseData?.date_completed)
        );
        setValue("description", responseData?.description);
      } else {
        throw "Error";
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (edit) {
      getGoal(goal_id);
    }
  }, [goal_id]);

  return (
    <form onSubmit={handleSubmit(createGoal)}>
      <h2 className="text-xl mb-12">Create Goal</h2>
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

export default GoalForm;
