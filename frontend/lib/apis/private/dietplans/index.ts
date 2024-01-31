import { privateRequest } from "../../base";
const root_endpoint = "dietplan";
const sub_root_endpoint = root_endpoint + "/predefined";

const getAllDietPlans = async () => {
  return privateRequest(`${root_endpoint}/`, "GET", null, "json");
};

const getDietPlanById = async (id: string | string[]) => {
  return privateRequest(`${root_endpoint}/${id}/`, "GET", null, "json");
};
const addDietPlan = async (body: any) => {
  return privateRequest(`${root_endpoint}/`, "POST", body, "json");
};

const updateDietPlan = async (body: any, id: string | string[]) => {
  return privateRequest(`${root_endpoint}/${id}/`, "PUT", body, "json");
};
const deleteDietPlan = async (id: string | string[]) => {
  return privateRequest(`${root_endpoint}/${id}/`, "DELETE", null, "json");
};

const getAllPredefinedDietPlan = async () => {
  return privateRequest(`${sub_root_endpoint}/`, "GET", null, "json");
};

const addPredefinedDietPlan = async (body: any) => {
  return privateRequest(`${sub_root_endpoint}/`, "POST", body, "json");
};

const getPredefinedDietPlanById = async (id: string | string[]) => {
  return privateRequest(`${sub_root_endpoint}/${id}/`, "GET", null, "json");
};
const updatePredefinedDietPlan = async (body: any, id: string | string[]) => {
  return privateRequest(`${root_endpoint}/${id}/`, "PUT", body, "json");
};
const deletePredefinedDietPlan = async (id: string | string[]) => {
  return privateRequest(`${sub_root_endpoint}/${id}/`, "DELETE", null, "json");
};

export {
  getAllDietPlans,
  getDietPlanById,
  addDietPlan,
  updateDietPlan,
  getAllPredefinedDietPlan,
  addPredefinedDietPlan,
  getPredefinedDietPlanById,
  deletePredefinedDietPlan,
  updatePredefinedDietPlan,
  deleteDietPlan,
};
