"use client";
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { FaPen } from "react-icons/fa";
import { WiTime4 } from "react-icons/wi";
// import { BiBookmark } from "react-icons/bi";
import DescriptInputItem from "@/app/conponents/registration/DescriptInputItem";
import { BiCamera, BiCameraOff, BiPlus } from "react-icons/bi";
// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import IngredientInputItem from "@/app/conponents/registration/IngredientInputItem";
import Footer from "../conponents/Footer";
import { inputDescript, InputIngredient, Recipe } from "../types";
import {
  addRecipe,
  addSomeDescript,
  addSomeIngredient,
  getImageUrl,
  uploadImage,
} from "../utils/supabaseFunctions";
import { Button } from "@mui/material";
import { updateRecipeImage } from "../utils/supabaseFncUpdate";
import { getFileExtension } from "../utils/fileUtils";
const Registration = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe>({ id: -1, name: "" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputDescripts, setInputDescripts] = useState<inputDescript[]>([
    { image: undefined, text: "" },
    { image: undefined, text: "" },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputIngredients, setInputIngredients] = useState<InputIngredient[]>([
    { name: "", amount: "" },
    { name: "", amount: "" },
  ]);
  const [recipeImageFile, setRecipeImageFile] = useState<File>();
  // 入力された値に空文字があったらtrue,なかったらfalseを返す
  function InputIngredientsIsSpace(targetInputIngredients: InputIngredient[]) {
    const target = targetInputIngredients.find((e) => {
      if (e.name == "" || e.amount == "") {
        return true;
      }
    });
    if (target !== undefined) {
      return true;
    }
    return false;
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file !== undefined) {
      setRecipeImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const a = getImageUrl("1/1.png");
  async function handleSubmit() {
    if (recipe.name === "") {
      console.log("url", a);
      console.log("TF", InputIngredientsIsSpace(inputIngredients));
      window.alert("料理名を入力してください");
      return false;
    } else if (InputIngredientsIsSpace(inputIngredients) === true) {
      window.alert("材料名、分量を入力してください");
      return false;
    } else {
      console.log("addRecipe", recipe);

      const recipe_id = await addRecipe(recipe);

      if (recipe_id !== undefined) {
        if (recipeImageFile !== undefined) {
          const extension = getFileExtension(recipeImageFile);
          const imagePath = `${recipe_id}/recipe.${extension}`;
          await uploadImage(recipeImageFile, imagePath);
          recipe.image_url = await getImageUrl(imagePath);
          console.log(recipe.image_url);
          updateRecipeImage(recipe_id, recipe.image_url);
        }
        addSomeDescript(recipe_id, inputDescripts);
        addSomeIngredient(recipe_id, inputIngredients);
      }

      window.alert("レシピが登録できました！");
      return true;
    }
  }
  return (
    <>
      <main className="bg-[#FFFBF4]">
        <p className="text-center font-semibold text-lg pt-4">レシピを登録</p>
        <section className="bg-gray-100 h-56 w-9/12 mx-auto rounded-xl mt-10 mb-12 shadow-lg flex-col flex gap-y-4 justify-center items-center relative">
          {selectedImage ? (
            <>
              <Image
                src={selectedImage}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                fill
              />
              <button
                title="a"
                className="w-6 h-6 rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2 flex justify-center items-center"
              >
                <BiPlus className="rotate-45 text-2xl text-white" />
              </button>
            </>
          ) : (
            <>
              <BiCameraOff className="text-gray-400 text-6xl" />
              <p className="text-gray-400">料理の写真を選択してください</p>
            </>
          )}

          <div className="absolute right-[-16px] bottom-[-16px]">
            <button
              title="b"
              className="w-12 h-12 rounded-full shadow-lg bg-white flex justify-center items-center"
            >
              <BiCamera className="text-2xl" style={{ color: "orange" }} />
            </button>

            <input
              title="料理の写真"
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
        </section>

        <div>
          <span className="text-red-500 ml-3 text-2xl">*</span>
        </div>
        <section className="flex items-center border-b border-gray-400 bg-[#FEF9EC] -mt-3">
          <FaPen className="ml-3 text-gray-400 text-2xl" />
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => {
              setRecipe((prev) => ({ ...prev, name: e.target.value }));
              console.log(recipe);
            }}
            placeholder="タイトル /例  基本のチャーハン"
            style={{ height: "40px", outline: "none" }}
            className="w-full bg-[#FEF9EC] pl-3"
          />
        </section>

        <section
          className="flex items-center w-1/5 border-b border-gray-400 bg-[#FEF9EC] mt-3"
          style={{ width: "200px" }}
        >
          <WiTime4 className="ml-3 mt-1 text-gray-400 text-3xl" />
          <input
            type="text"
            name="time"
            onChange={(e) => {
              setRecipe((prev) => ({ ...prev, time: e.target.value }));
              console.log(recipe);
            }}
            id="time"
            placeholder="時間  /例  約10分"
            style={{ height: "40px", outline: "none" }}
            className="pt-1 bg-[#FEF9EC] pl-2"
          />
        </section>
        <section>
          <div className="relative inline-block">
            <Image
              className="py-4 pl-1 translate-y-4"
              alt={""}
              src="/Vector.png"
              height={30}
              width={80}
            />
            <p
              className="absolute inset-0 flex items-center justify-center font-semibold translate-y-4 text-gray-600"
              style={{ left: "-16px" }}
            >
              材料
            </p>
          </div>

          <div>
            <input
              name="howmany"
              id="people"
              placeholder="人数  /例  2人分"
              onChange={(e) => {
                setRecipe((prev) => ({ ...prev, howmany: e.target.value }));
                console.log(recipe);
              }}
              style={{
                backgroundColor: "#FEF9EC",
                height: "40px",
                outline: "none",
              }}
              className="w-full border-b border-gray-400 mt-4 pl-3"
            />
          </div>
          <IngredientInputItem
            inputs={inputIngredients}
            setInputs={setInputIngredients}
          />
        </section>

        <section className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            作り方
          </p>
          <DescriptInputItem
            inputItems={inputDescripts}
            setInputItems={setInputDescripts}
          />
        </section>

        <section className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            料理の紹介
          </p>
          <textarea
            title="料理の紹介"
            name="comment"
            id="comment"
            onChange={(e) => {
              setRecipe((prev) => ({ ...prev, comment: e.target.value }));
              console.log(recipe);
            }}
            className="w-full border border-gray-500 outline-none"
            style={{ outline: "none" }}
            rows={4}
          ></textarea>
        </section>

        <div>
          <Button
            onClick={handleSubmit}
            className="flex justify-center text-white bg-orange-400 hover:bg-orange-400 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
          >
            レシピを登録する
          </Button>
          <div className="bg-[#FFFBF4] w-full h-8"></div>
        </div>
      </main>
      <Footer pathName="/registration" />
    </>
  );
};

export default Registration;
