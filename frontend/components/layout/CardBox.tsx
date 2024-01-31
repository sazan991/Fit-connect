import Link from "next/link";

const CardBox = ({
  title,
  create_link,
  link_label,
  children,
  view_all_link,
}: {
  title: string;
  create_link: string;
  link_label: string;
  children: React.ReactNode;
  view_all_link: string;
}) => {
  return (
    <div className="border border-gray p-6.5 shadow-default rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">{title}</h2>
        <Link href={create_link} className="text-primary">
          {link_label}
        </Link>
      </div>
      <div className="flex gap-3">{children}</div>
      <div className="text-end">
        <Link className="text-primary" href={view_all_link}>
          View All
        </Link>
      </div>
    </div>
  );
};

export default CardBox;
