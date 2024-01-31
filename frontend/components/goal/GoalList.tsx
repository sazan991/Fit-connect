"use client";

import { getAllGoals } from "@/lib/apis/private/goals";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GoalList = () => {
  const [goals, setGoals] = useState<Array<any>>([]);
  const router = useRouter();
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

  useEffect(() => {
    fetchGoals();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl">List of all goals</h2>
        <button onClick={() => router.back()} className="text-primary">
          Back
        </button>
      </div>
      <div className="p-6.5 flex flex-col gap-3">
        {goals &&
          goals?.length > 0 &&
          goals.map((goal) => (
            <div
              key={goal?.id}
              className="flex justify-between items-center py-4 px-2 rounded-md border border-primary"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">{goal?.name}</h3>
                <p className="text-sm">{goal?.status}</p>
              </div>
              <div className="">
                <div>
                  <span>
                    {new Date(goal?.date_start).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-bold"> to </span>
                  <span>
                    {new Date(goal?.date_completed).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex item-center gap-3 justify-center mt-1">
                  <Link
                    href={`/goal/edit/${goal?.id}`}
                    className="text-primary"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/goal/view/${goal?.id}`}
                    className="text-success"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default GoalList;
