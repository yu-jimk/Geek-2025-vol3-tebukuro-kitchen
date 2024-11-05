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
            <div className="mx-2 mt-5 mb-5">
              <div className="font-bold text-lg text-orange-400">
                「進んで」
              </div>
              <div className="ml-8">ページを進めます。</div>
              <div className="font-bold text-lg text-orange-400">
                「戻って」
              </div>
              <div className="ml-8">ページを戻します。</div>
              <div className="font-bold text-lg text-orange-400">
                「材料は?」
              </div>
              <div className="ml-8">必要な材料を一覧表示します。</div>
              <div className="font-bold text-lg text-orange-400">
                「~ってどうするの?」
              </div>
              <div className="ml-8">
                切り方等をYoutubeで検索し、動画を再生します。
              </div>
              <div className="font-bold text-lg text-orange-400">
                「タイマーxxセットして」
              </div>
              <div className="ml-8">
                タイマーをxxの時間セットして、表示します。
              </div>
              <div className="font-bold text-lg text-orange-400">
                「閉じて」
              </div>
              <div className="ml-8">材料一覧や動画などの表示を閉じます。</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
