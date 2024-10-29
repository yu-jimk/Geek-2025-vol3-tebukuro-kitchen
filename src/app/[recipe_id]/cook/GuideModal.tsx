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
            <div className="mx-5 mt-5 mb-5">
              <span className="font-bold text-lg text-orange-400">「進んで」</span>
              　ページを進めます。
              <br />
              <span className="font-bold text-lg text-orange-400">「戻って」</span>
              　ページを戻します。
              <br />
              <br />
              <span className="font-bold text-lg text-orange-400">「材料は?」</span>
              　必要な材料を一覧表示します。
              <br />
              <div className="font-bold text-lg text-orange-400">「~ってどうするの?」</div>
              　切り方等をYoutubeで検索し、動画を再生します。
              <br />
              <div className="font-bold text-lg text-orange-400">「タイマーxxセットして」</div>
              　タイマーをxxの時間セットして、表示します。
              <br />
              <div className="font-bold text-lg text-orange-400">「閉じて」</div>
              　材料一覧や動画などの表示を閉じます。
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
