import { privateRequest } from "../../base";

const root_endpoint = "gym";
const getAllGym = async () => {
  return privateRequest(`${root_endpoint}/gym/`, "GET", null, "json");
};

const addGym = async (body: any) => {
  return privateRequest(`${root_endpoint}/gym/`, "POST", body, "json");
};

const updateGym = async (body: any, id: string) => {
  return privateRequest(`${root_endpoint}/gym/${id}/`, "PUT", body, "json");
};

const deleteGym = async (id: string) => {
  return privateRequest(`${root_endpoint}/gym/${id}/`, "DELETE", null, "json");
};

export { getAllGym, addGym, updateGym, deleteGym };
