import Link from "next/link";

const DietPlanCard = () => {
  return (
    <div className="min-w-[300px] flex flex-col gap-2 border border-[#eee] rounded-md py-5 px-5">
      <p className="text-end ">Target:20000</p>
      <p className="text-sm mb-5 text-end">Per day calorie:10</p>
      <h2 className="text-2xl mb-2">Plan One</h2>
      <ul className="m-0 p-0 mb-4">
        <li>Difficulty:Easy</li>
        <li>Type</li>
      </ul>
      <Link href="/dietplans" className="text-primary text-end">
        View All
      </Link>
    </div>
  );
};

export default DietPlanCard;
