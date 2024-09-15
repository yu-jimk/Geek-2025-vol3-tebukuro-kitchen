import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { WiTime4 } from "react-icons/wi";

const RecipeId = () => {
  return (
    <>
      <header className="relative flex items-center p-6 border-b border-gray-400 shadow-md">
        <IoIosArrowBack className="absolute left-5 text-3xl" />
        <div className="flex-1 text-center text-xl font-semibold">
          基本のチャーハン
        </div>
      </header>

      <main className="bg-amber-50">
        <div className="flex justify-center items-center border-b border-gray-400 shadow-md">
          <Image src="/" alt="" width={430} height={297} />
        </div>

        <div className="border-b-2 border-gray-300 m-4">
          <div className="flex justify-between">
            <div className="text-2xl font-semibold text-amber-900">
              基本のチャーハン
            </div>
            <div className="text-xs text-gray-500">
              <FiHeart stroke="#807E7E" className="h-7 w-7 mb-1 mx-auto" />
              お気に入り
            </div>
          </div>

          <div className="flex items-center">
            <WiTime4 fill="#fa003f" className="h-7 w-7 my-2 mr-2" />
            約10分
          </div>
          <div className="text-sm font-semibold text-stone-600 py-3">
            基本的なチャーハンです。誰でも簡単に作れます。お好みでベーコンを入れたり好きな食材を使ってみてください。
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeId;
