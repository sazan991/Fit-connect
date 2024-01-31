import GoalForm from "@/components/goal/GoalForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitconnect | Edit Goal",
};
export default function GoalEditPage() {
  return <GoalForm edit={true} />;
}
