"use client";

import dynamic from "next/dynamic";
import { ChangeEvent, useDeferredValue, useState } from "react";
import { CiSearch } from "react-icons/ci";

const VideoResults = dynamic(() => import("./VideoResults"), {
  ssr: false,
  loading: () => <div>Loading....</div>,
});

const VideoThumbnails = () => {
  const [query, setQuery] = useState<string>("");
  // const deferredquery = useDeferredValue(query);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="flex items-center relative">
        <span className="absolute left-[10px] text-graydark">
          <CiSearch size={26} />
        </span>
        <input
          onChange={handleChange}
          type="search"
          placeholder="Search youtube videos"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 pl-[50px] pr-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
      <VideoResults query={query} />
    </>
  );
};

export default VideoThumbnails;
