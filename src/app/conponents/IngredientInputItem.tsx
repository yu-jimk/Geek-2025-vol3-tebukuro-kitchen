"use client";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

type IngredientInput = {
  ingredient: string;
  quantity: string;
};

const IngredientInputItem = () => {
  const [inputs, setInputs] = useState<IngredientInput[]>([
    { ingredient: "", quantity: "" },
    { ingredient: "", quantity: "" },
  ]);
  const maxInputs = 5;

  const addInput = () => {
    if (inputs.length < maxInputs) {
      setInputs([...inputs, { ingredient: "", quantity: "" }]);
    }
  };

  // 削除関数（試作）
  //   const removeInput = (index: number) => {
  //     const newInputs = inputs.filter((_, i) => i !== index);
  //     setInputs(newInputs);
  //   };

  const handleInputChange = (
    index: number,
    field: keyof IngredientInput,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index][field] = event.target.value;
    setInputs(newInputs);
  };

  return (
    <div className="mt-4">
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-4 items-center">
          <input
            type="text"
            name={`ingredient${index}`}
            id={`ingredient${index}`}
            value={input.ingredient}
            style={{ outline: "none" }}
            onChange={(e) => handleInputChange(index, "ingredient", e)}
            placeholder="材料  /例  たまご"
            className="w-full border-b border-gray-400 pl-3 bg-[#FEF9EC] h-[40px]"
          />

          <input
            type="text"
            name={`quantity${index}`}
            id={`quantity${index}`}
            value={input.quantity}
            style={{ outline: "none" }}
            onChange={(e) => handleInputChange(index, "quantity", e)}
            placeholder="分量  /例  2個"
            className="w-1/2 border-b border-gray-400 pl-3 bg-[#FEF9EC] h-[40px]"
          />

          {/* 削除用ボタン */}
          {/* <button onClick={() => removeInput(index)} className="text-red-500">
            
            <BiTrash className="text-2xl" />
          </button> */}
        </div>
      ))}
      <button
        onClick={addInput}
        disabled={inputs.length >= maxInputs}
        className="flex mx-auto my-4 text-orange-400"
      >
        <BiPlus className="text-2xl" />
        <p>項目を増やす</p>
      </button>
    </div>
  );
};

export default IngredientInputItem;
