import { GoalFormModel } from "@/components/goal/GoalForm";
import { privateRequest } from "../../base";
const root_endpoint = "goal";
const getAllGoals = async () => {
  return privateRequest(`${root_endpoint}/list`, "GET", null, "json");
};

const getGoalById = async (id: string | string[]) => {
  return privateRequest(`${root_endpoint}/detail/${id}/`, "GET", null, "json");
};
const addGoal = async (body: GoalFormModel) => {
  return privateRequest(`${root_endpoint}/`, "POST", body, "json");
};

const updateGoal = async (body: GoalFormModel, id: string | string[]) => {
  return privateRequest(`${root_endpoint}/${id}/`, "PUT", body, "json");
};

export { getAllGoals, getGoalById, addGoal, updateGoal };
