import { Ingredient } from "@/app/types";
import React from "react";
import { IoMdClose } from "react-icons/io";

const IngModal = ({
  modalClose,
  ingredient,
  howMany,
}: {
  modalClose: () => void;
  ingredient: Ingredient[];
  howMany: string;
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
            <div className="font-bold mx-5 w-[60vw] mb-5 text-xl border-b-2 border-orange-400">
              {`材料${howMany == "" ? "" : `${howMany}人前`}`}
            </div>
            <div className="mb-5">
              {ingredient.map((ing: Ingredient) => (
                <div
                  key={ing.index}
                  className={`flex justify-between my-1 ${
                    ing.index == ingredient.length - 1
                      ? ""
                      : "border-b-2 border-dotted border-gray-500"
                  }`}
                >
                  <span className="ml-3 mb-1 text-black">
                    {ing.name}
                  </span>
                  <span className="mr-3 text-black">{ing.amount}</span>
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
