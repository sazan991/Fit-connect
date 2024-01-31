import Link from "next/link";

const GoalsCard = ({
  start_date,
  end_date,
  name,
  status,
  id,
}: {
  start_date: string;
  end_date: string;
  name: string;
  status: string;
  id: string;
}) => {
  return (
    <div className="border border-darksecond p-3">
      <div className="text-sm">
        <span>Start Date:</span>
        <span>
          {new Date(start_date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="text-sm mb-3">
        <span>End Date:</span>
        <span>
          {new Date(end_date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <h2 className="text-xl mb-2">{name}</h2>
      <div>
        <span>Status:</span>
        <span className="border border-darksecond p-1 rounded-md text-sm">
          {status}
        </span>
      </div>
      <div className="text-end">
        <Link
          href={`/goal/view/${id}`}
          className="text-primary mt-6.5 inline-block"
        >
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default GoalsCard;
