import Image from "next/image";
import Link from "next/link";
import { WiTime4 } from "react-icons/wi";
import DescriptItem from "../conponents/DescriptItem";
import FavoriteButton from "../conponents/FavoriteButton";
import Footer from "../conponents/Footer";
import IngredientItem from "../conponents/IngredientItem";
import RecipeHeader from "../conponents/RecipeHeader";

const RecipeId = () => {
  return (
    <>
      <RecipeHeader
        bgColor="bg-white"
        textColor="text-black"
        title="基本のチャーハン"
        link="/"
      />

      <main className="bg-[#FFFBF4] pb-10">
        <div className="flex justify-center border-b border-gray-400 shadow-md">
          <Image src="/" alt="" width={430} height={297} />
        </div>

        <div className="border-b border-gray-300 m-4">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold text-[#815B2C]">
              基本のチャーハン
            </p>
            <FavoriteButton />
          </div>

          <div className="flex items-center my-2">
            <WiTime4 fill="#fa003f" className="size-8 mr-2" />
            約10分
          </div>

          <p className="text-sm font-semibold text-stone-600 py-3">
            基本的なチャーハンです。誰でも簡単に作れます。お好みでベーコンを入れたり好きな食材を使ってみてください。
          </p>
        </div>

        <div className="pt-1 pb-8">
          <p className="bg-[#F9DEDC] font-semibold text-sm px-4 py-2">
            材料（2人分）
          </p>
          <IngredientItem />
        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
            作り方
          </p>
          <DescriptItem />
        </div>

        <Link
          href="./future_recipe_id/cook"
          className="flex justify-center text-white bg-orange-400 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
        >
          つくる
        </Link>
      </main>

      <Footer />
    </>
  );
};

export default RecipeId;
