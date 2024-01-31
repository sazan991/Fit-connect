import { useParent } from "./Parent";

const SubChild = ({ name, setName }: { name?: string; setName?: any }) => {
  console.log("I am sub child.Ma render vaye!");
  const parent = useParent();

  console.log(parent);
  return (
    <>
      {parent?.name}
      <button
        style={{ display: "block", border: "1px solid #000" }}
        onClick={() => {
          parent?.setName("Prakash....");
        }}
      >
        Change my name
      </button>
      <button>........hahahah......</button>
    </>
  );
};

export default SubChild;
