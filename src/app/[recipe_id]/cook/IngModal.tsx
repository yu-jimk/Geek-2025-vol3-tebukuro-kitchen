import { Ingredient } from "@/app/types";
import React from "react";
import { IoMdClose } from "react-icons/io";

const IngModal = ({
  modalClose,
  ingredient,
}: {
  modalClose: () => void;
  ingredient: Ingredient[];
}) => {
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0">
        <div
          onClick={bgClickClose}
          className="flex justify-center items-center h-full"
        >
          <div className="bg-white mx-10 shadow-lg text-black">
            <div className="flex w-full justify-end">
              <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
            </div>
            <div className="mx-5 mb-5">
              {ingredient.map((ing: Ingredient) => (
                <div key={ing.index}>
                  <span className="text-lg font-mono font-bold text-orange-400">
                    {ing.name}
                  </span>
                  <span> : {ing.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
