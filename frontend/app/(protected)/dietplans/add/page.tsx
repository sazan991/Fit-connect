import DietPlanForm from "@/components/dietplans/DietPlanForm";
import PredefinedDietPlanForm from "@/components/dietplans/PredefinedDietPlanForm";

export default function AddDietPlan({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return (
    <>
      {searchParams?.type === "predefined" ? (
        <PredefinedDietPlanForm />
      ) : (
        <DietPlanForm />
      )}
    </>
  );
}
