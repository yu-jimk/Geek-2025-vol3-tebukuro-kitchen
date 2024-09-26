import DescriptItem from "@/app/conponents/DescriptItem";
import FavoriteButton from "@/app/conponents/FavoriteButton";
import Footer from "@/app/conponents/Footer";
import IngredientItem from "@/app/conponents/IngredientItem";
import RecipeHeader from "@/app/conponents/RecipeHeader";
import { Descript, Ingredient } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { FiCameraOff } from "react-icons/fi";
import { WiTime4 } from "react-icons/wi";

export default async function RecipeId({
  params,
}: {
  params: { recipe_id: string };
}) {
  // const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = "http://localhost:3000";

  const res = await fetch(`${API_URL}/api/${params.recipe_id}`, {
    next: {
      revalidate: 10,
    },
  });

  const detailArticle = await res.json();

  // console.log(detailArticle);

  return (
    <>
      <RecipeHeader
        bgColor="bg-white"
        textColor="text-black"
        title={detailArticle.name}
        link="/"
      />

      <main className="bg-[#FFFBF4] pb-10">
        <div className="flex justify-center items-center border-b border-gray-400 shadow-md aspect-[3/2] bg-gray-100">
          {/* nullのみを判定しているので、url先の画像が見つからない場合に対処できない */}
          {detailArticle.image_url ? (
            <Image
              src={detailArticle.image_url}
              alt={detailArticle.name}
              width={450}
              height={300}
              layout={"responsive"}
              objectFit={"cover"}
            />
          ) : (
            <FiCameraOff size={40} stroke="#737373" />
          )}
        </div>

        <div className="border-b border-gray-300 m-4 pb-4">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold text-[#815B2C]">
              {detailArticle.name}
            </p>
            <FavoriteButton />
          </div>

          {detailArticle.time ? (
            <div className="flex items-center py-2 gap-2">
              <WiTime4 fill="#fa003f" className="size-8" />
              {detailArticle.time}
            </div>
          ) : null}

          {detailArticle.comment ? (
            <p className="text-sm font-semibold text-stone-600 pt-3">
              {detailArticle.comment}
            </p>
          ) : null}
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="pt-1 pb-8 flex-1">
            <div className="bg-[#F9DEDC] font-semibold text-sm px-4 py-2">
              {detailArticle.how_many ? (
                <p>材料（{detailArticle.how_many}）</p>
              ) : (
                <p>材料</p>
              )}
            </div>
            {detailArticle.Ingredients.map((ingredient: Ingredient) => (
              <IngredientItem
                key={ingredient.id}
                id={ingredient.id}
                name={ingredient.name}
                amount={ingredient.amount}
                recipe_id={ingredient.recipe_id}
              />
            ))}
          </div>

          <div className="mx-4">
            <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
              作り方
            </p>
            {detailArticle.Descripts.map((descript: Descript) => (
              <DescriptItem
                key={descript.id}
                id={descript.id}
                text={descript.text}
                image_url={descript.image_url}
                recipe_id={descript.recipe_id}
              />
            ))}
          </div>
        </div>

        <Link
          href={`./${params.recipe_id}/cook`}
          className="flex justify-center text-white bg-orange-400 hover:bg-orange-500 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
        >
          つくる
        </Link>
      </main>

      <Footer />
    </>
  );
}
