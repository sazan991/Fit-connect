"use client";

import { getAllGym } from "@/lib/apis/private/gym";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GymLists = () => {
  const [gyms, setGyms] = useState<Array<any>>([]);
  const router = useRouter();
  const fetchGyms = async () => {
    try {
      const response = await getAllGym();
      const responseData = await response.json();

      if (response.ok) {
        setGyms(responseData?.results);
      } else {
        throw "ERROROR"!;
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    fetchGyms();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
      (err) => console.log(err)
    );
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl">List of all gyms</h2>
      </div>
      <div className="p-6.5 flex flex-col gap-3">
        {gyms &&
          gyms?.length > 0 &&
          gyms.map((gym) => (
            <div
              key={gym?.id}
              className="flex justify-between items-center py-4 px-2 rounded-md border border-primary"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">{gym?.name}</h3>
                <p className="text-sm">{gym?.location}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default GymLists;
