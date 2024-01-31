"use client";

import { getGoalById } from "@/lib/apis/private/goals";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const GoalView = () => {
  const [goal, setGoal] = useState<any>({});
  const params = useParams();
  const { goal_id } = params;
  const fetchGoal = async (id: string | string[]) => {
    try {
      const response = await getGoalById(goal_id as string);
      const responseData = await response.json();

      if (response.ok) {
        setGoal(responseData);
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    fetchGoal(goal_id);
  }, [goal_id]);

  return <div>Goal View Page</div>;
};

export default GoalView;
