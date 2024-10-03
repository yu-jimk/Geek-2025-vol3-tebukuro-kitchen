import React from "react";
import { IoMdClose } from "react-icons/io";

const IngModal = ({ modalClose }: { modalClose: () => void }) => {
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
          <div className="bg-white mx-10 shadow-md text-black">
            <div className="flex w-full justify-end">
              <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
            </div>
            <div className="font-bold mx-5 w-52 text-xl border-b-2 border-orange-400">
              たまご
            </div>
            <div className="mt-5 mb-10 bg-orange-100">
              <div className="ml-5">個数：２個</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
