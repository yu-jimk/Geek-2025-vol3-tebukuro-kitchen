import React from "react";

const Modal = ({ modalClose }: { modalClose: () => void }) => {

  const bgClick = (e: React.MouseEvent) => {
    // クリックイベントがモーダルの内容部分でなければ関数を実行
    console.log(e.currentTarget);
    console.log(e.target === e.currentTarget);
    if (e.target === e.currentTarget) {
      console.log(e.currentTarget);
      modalClose();
    }
  };
  
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0">
        <div
          onClick={bgClick}
          className="flex justify-center items-center h-full"
        >
          <div className="bg-white p-5 mx-10 shadow-lg text-black">説明文</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
