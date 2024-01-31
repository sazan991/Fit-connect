import { SignInModel } from "@/app/(auth)/signin/page";
import { publicRequest } from "../../base";
import { SignupModel } from "@/app/(auth)/signup/page";
const root_endpoint = "user";
const authLogin = async (body: SignInModel) => {
  return publicRequest(`${root_endpoint}/token/`, "POST", body, "json");
};
const authSignup = async (
  body: Pick<SignupModel, "email" | "password" | "level">
) => {
  return publicRequest(`${root_endpoint}/register/`, "POST", body, "json");
};

export { authLogin, authSignup };
