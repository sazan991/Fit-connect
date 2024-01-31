"use client";

import { useState, createContext, useContext } from "react";
import Child from "./Child";

interface ParentProps {
  name: string;
  setName: any;
}

const ParentContext = createContext<ParentProps | null>(null);

const P = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("Bhim");
  return (
    <ParentContext.Provider value={{ name, setName }}>
      {children}
    </ParentContext.Provider>
  );
};

export const useParent = () => {
  const context = useContext(ParentContext);

  if (!context) {
    throw new Error(
      "parent context must be used inside the provider of parent!!"
    );
  }

  return context;
};

const Parent = () => {
  return (
    <>
      <P>
        <Child />
      </P>
    </>
  );
};

export default Parent;

//  <div>
//    <label className="mb-3 block text-black dark:text-white">
//      Default textarea
//    </label>
//    <textarea
//      rows={6}
//      placeholder="Default textarea"
//      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//    ></textarea>
//  </div>;

//  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//      <h3 className="font-medium text-black dark:text-white">File upload</h3>
//    </div>
//    <div className="flex flex-col gap-5.5 p-6.5">
//      <div>
//        <label className="mb-3 block text-black dark:text-white">
//          Attach file
//        </label>
//        <input
//          type="file"
//          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
//        />
//      </div>

//      <div>
//        <label className="mb-3 block text-black dark:text-white">
//          Attach file
//        </label>
//        <input
//          type="file"
//          className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
//        />
//      </div>
//    </div>
//  </div>;

{
  /* <div>
  <label className="mb-3 block text-black dark:text-white">Date picker</label>
  <div className="relative">
    <input
      type="date"
      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    />
  </div>
</div>; */
}

{
  /* <div>
  <label className="mb-3 block text-black dark:text-white">Default Input</label>
  <input
    type="text"
    placeholder="Default Input"
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
  />
</div>; */
}
