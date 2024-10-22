"use client";
import { InputIngredient } from "@/app/types";
import { Dispatch, SetStateAction } from "react";
import { BiPlus } from "react-icons/bi";
interface IngredientInputItem {
  inputs:InputIngredient[],
  setInputs:Dispatch<SetStateAction<InputIngredient[]>>,
} 
const IngredientInputItem = ({inputs,setInputs}:IngredientInputItem) => {
  const maxInputs = 5;

  const addInput = () => {
    if (inputs.length < maxInputs) {
      setInputs([...inputs, { name: "", amount: "" }]);
    }
  };

  // 削除関数（試作）
  //   const removeInput = (index: number) => {
  //     const newInputs = inputs.filter((_, i) => i !== index);
  //     setInputs(newInputs);
  //   };

  const handleInputChange = (
    index: number,
    field: keyof InputIngredient,
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
            value={input.name}
            style={{ outline: "none" }}
            onChange={(e) => handleInputChange(index, "name", e)}
            placeholder="材料  /例  たまご"
            className="w-full border-b border-gray-400 pl-3 bg-[#FEF9EC] h-[40px]"
          />

          <input
            type="text"
            name={`quantity${index}`}
            id={`quantity${index}`}
            value={input.amount}
            style={{ outline: "none" }}
            onChange={(e) => handleInputChange(index, "amount", e)}
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
