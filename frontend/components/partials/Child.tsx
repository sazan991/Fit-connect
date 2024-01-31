import { useState } from "react";
import SubChild from "./SubChild";

const Child = ({ name, setName }: { name?: string; setName?: any }) => {
  console.log("I am child.I rendered!");
  return <SubChild />;
};

export default Child;
