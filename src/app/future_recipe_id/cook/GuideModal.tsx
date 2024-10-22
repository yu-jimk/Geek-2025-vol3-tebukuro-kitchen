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
          <div className="bg-white mx-10 shadow-lg text-black">
            <div className="flex w-full justify-end">
              <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
            </div>
            <div className="font-bold mx-5 w-52 text-xl border-b-2 border-orange-400">
              音声認識ガイド
            </div>
            <div className="mt-5 mb-1 bg-orange-100">
              <div className="ml-5">
                <div className="text-2xl font-bold">「進んで」</div>
                次のページに進みます。
              </div>
              <div className="ml-5">
                <div className="text-2xl font-bold">「戻って」</div>
                前のページに戻ります。
              </div>
            </div>
            <div className="mt-5 mb-1 bg-orange-100">
              <div className="ml-5">
                <div className="text-2xl font-bold">「材料は？」</div>
                必要な材料を一覧表示します。
              </div>
              <div className="ml-5">
                <div className="text-2xl font-bold">「～ってどうするの？」</div>
                切り方等分からないことをYoutubeで検索し、動画を再生します。
              </div>
            </div>
            <div className="mt-5 mb-10 bg-orange-100">
              <div className="ml-5">
                <div className="text-2xl font-bold">「閉じて」</div>
                材料一覧や動画などの表示を閉じます。
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
