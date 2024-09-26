import { Ingredient } from "@/app/types";

const IngredientItem = (props: Ingredient) => {
  const { name, amount } = props;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#C3B6B6] bg-[#FEF9EC]">
      <p>{name}</p>
      <p>{amount}</p>
    </div>
  );
};

export default IngredientItem;
