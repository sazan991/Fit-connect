import GoalForm from "@/components/goal/GoalForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fitconnect | Create Goal",
  description: "Create goals and complete it by tracking",
};
export default function GoalAddPage() {
  return <GoalForm edit={false} />;
}
