"use client";

import DescriptItem from "@/app/conponents/DescriptItem";
import FavoriteButton from "@/app/conponents/FavoriteButton";
import Footer from "@/app/conponents/Footer";
import IngredientItem from "@/app/conponents/IngredientItem";
import RecipeHeader from "@/app/conponents/RecipeHeader";
import { Descript, DetailRecipe, Ingredient } from "@/app/types";
import { getDetailRecipebyId } from "@/app/utils/supabaseFunctions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCameraOff } from "react-icons/fi";
import { WiTime4 } from "react-icons/wi";

export default function RecipeId({
  params,
}: {
  params: { recipe_id: number };
}) {
  const [list, setList] = useState<DetailRecipe>();
  useEffect(() => {
    const getDetailRecipe = async () => {
      const detailRecipe = await getDetailRecipebyId(params.recipe_id);
      setList(detailRecipe);
      // const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // const res = await fetch(`${API_URL}/api/${params.recipe_id}`, {
      //   next: {
      //     revalidate: 10,
      //   },
      // });
    };
    getDetailRecipe();
  }, [params.recipe_id]);

  if (!list) {
    return null;
  }

  return (
    <>
      <RecipeHeader
        bgColor="bg-white"
        textColor="text-black"
        title={list.name}
        link="/"
      />

      <main className="bg-[#FFFBF4] pb-10 min-h-[calc(100vh-150px)] ">
        <div className="flex justify-center items-center border-b border-gray-400 shadow-md aspect-[3/2] bg-gray-100">
          {/* nullのみを判定しているので、url先の画像が見つからない場合に対処できない */}
          {list.image_url ? (
            <Image
              src={list.image_url}
              alt={list.name}
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
            <p className="text-2xl font-semibold text-[#815B2C]">{list.name}</p>
            <FavoriteButton
              recipe={{
                id: list.id,
                name: list.name,
                image_url: list.image_url,
                time: list.time,
                comment: list.comment,
                howmany: list.howmany,
              }}
            />
          </div>

          {list.time && (
            <div className="flex items-center py-2 gap-2">
              <WiTime4 fill="#fa003f" className="size-8" />
              {list.time}
            </div>
          )}

          {list.comment && (
            <p className="text-sm font-semibold text-stone-600 pt-3">
              {list.comment}
            </p>
          )}
        </div>

        <div className="lg:flex justify-between items-start">
          <div className="pt-1 pb-8 flex-1">
            <div className="bg-[#F9DEDC] font-semibold text-sm px-4 py-2">
              {list.howmany ? <p>材料（{list.howmany}）</p> : <p>材料</p>}
            </div>
            {list.Ingredients.map((ingredient: Ingredient) => (
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
            <div className="space-y-1">
              {list.Descripts.map((descript: Descript, index) => (
                <DescriptItem
                  key={descript.id}
                  id={index + 1}
                  text={descript.text}
                  image_url={descript.image_url}
                  recipe_id={descript.recipe_id}
                />
              ))}
            </div>
          </div>
        </div>

        <Link
          href={`./${params.recipe_id}/cook`}
          className="flex justify-center text-white bg-orange-400 hover:bg-orange-500 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
        >
          つくる
        </Link>
      </main>

      <Footer pathName="/" />
    </>
  );
}
