import { API_URL } from "@/config";
import { initialState } from "../providers/UserContext";

const token = "";

const publicRequest = async (
  endpoint: string,
  method: string,
  body: any,
  type: "json" | "formdata",
  signal?: any
) => {
  try {
    if (type === "formdata") {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method, // => method:method
        body: method !== "GET" ? body : null,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response;
      return responseData;
    } else {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method,
        body: method !== "GET" ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response;
      return responseData;
    }
  } catch (err) {
    throw err;
  } finally {
  }
};

const privateRequest = async (
  endpoint: string,
  method: string,
  body: any,
  type: "json" | "formdata",
  signal?: any
) => {
  try {
    if (type === "formdata") {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method, // => method:method
        body: method !== "GET" ? body : null,
        headers: {
          Authorization: `Bearer ${initialState()?.token}`,
        },
        signal,
      });
      const responseData = await response;
      return responseData;
    } else {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method,
        body: method !== "GET" ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${initialState()?.token}`,
        },
        signal,
      });
      const responseData = await response;
      return responseData;
    }
  } catch (err) {
    throw err;
  } finally {
  }
};

export { publicRequest, privateRequest };
