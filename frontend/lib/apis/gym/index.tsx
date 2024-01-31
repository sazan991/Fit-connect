import { privateRequest } from "../base";

const gymlist = async (id: string | string[]) => {
    return privateRequest(`${root_endpoint}/list/`, "GET", null, "json");
  };