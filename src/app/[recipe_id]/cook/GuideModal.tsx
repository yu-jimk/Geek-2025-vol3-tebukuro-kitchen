import React from "react";
import { IoMdClose } from "react-icons/io";

const IngModal = ({ modalClose }: { modalClose: () => void }) => {
  // 背景押したら閉じるやつ
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
          <div className="bg-white shadow-lg text-black rounded-2xl p-3 mx-5 w-full max-w-sm sm:max-w-md md:max-w-lg">
            <div className="flex w-full justify-end">
              <IoMdClose
                onClick={modalClose}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <div className="font-bold text-lg text-center mb-2 border-b border-orange-400">
              音声認識ガイド
            </div>
            <div className="text-sm">
              <div className="font-bold text-orange-400">「進んで」</div>
              <div className="ml-4 mb-3">1ページ進みます。</div>
              <div className="font-bold text-orange-400">「戻って」</div>
              <div className="ml-4 mb-3">1ページ戻ります。</div>
              <div className="font-bold text-orange-400">「材料は?」</div>
              <div className="ml-4 mb-3">材料を表示します。</div>
              <div className="font-bold text-orange-400">
                「~ってどうするの?」
              </div>
              <div className="ml-4 mb-3">
                切り方の動画を再生します。
                <div className="text-xs text-gray-500">
                  {"（例）「いちょう切りってどうするの？」"}
                </div>
              </div>
              <div className="font-bold text-orange-400">
                「タイマーxxセット」
              </div>
              <div className="ml-4 mb-3">
                タイマーをxxの時間セットして、表示します。
                <div className="text-xs text-gray-500">
                  {"（例）「タイマー3分セット」"}
                </div>
              </div>
              <div className="font-bold text-lg text-orange-400">
                「閉じて」
              </div>
              <div className="ml-4">表示を閉じます。</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
