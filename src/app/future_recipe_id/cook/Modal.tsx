import React from "react";

const Modal = () => {
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0">
        <div className="flex justify-center items-center h-full">
          <div className="bg-white p-5 mx-10 shadow-lg text-black">説明文</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
