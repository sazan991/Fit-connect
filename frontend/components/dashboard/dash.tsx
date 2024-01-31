"use client";

import { getAllGoals } from "@/lib/apis/private/goals";
import { Fragment, useEffect, useState } from "react";
import CardBox from "../layout/CardBox";
import GoalsCard from "../partials/GoalsCard";

export default function Dash() {
  const [goals, setGoals] = useState<Array<any>>([]);

  const fetchGoals = async () => {
    try {
      const response = await getAllGoals();
      const responseData = await response.json();

      if (response.ok) {
        setGoals(responseData?.results);
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <>
      <div>
        <CardBox
          title="All Goals"
          create_link="/goal/add"
          link_label="Create Goal"
          view_all_link="/goal"
        >
          {goals &&
            goals?.length > 0 &&
            goals.map((goal) => (
              <Fragment key={goal?.id}>
                <GoalsCard
                  start_date={goal?.date_start}
                  end_date={goal?.date_completed}
                  name={goal?.name}
                  status={goal?.status}
                  id={goal?.id}
                />
              </Fragment>
            ))}
        </CardBox>
        <CardBox
          title="All Dietplans"
          create_link="/dietplan/add"
          link_label="Create Dietplan"
          view_all_link="/dietplans"
        >
          <div>Diet Plans</div>
        </CardBox>
      </div>
    </>
  );
}
