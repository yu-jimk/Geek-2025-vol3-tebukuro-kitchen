import React, { Dispatch, SetStateAction, useState } from "react";
import { Recipe } from "../types";
import { FiSearch } from "react-icons/fi";

type propsType = {
  recipes: Recipe[];
  // 検索中のレシピ配列をセットする
  setFilRecipes: Dispatch<SetStateAction<Recipe[]>>;
  // 検索中の場合かどうかを判断する
  setFilteringNow: Dispatch<SetStateAction<boolean>>;
};

const SearchRecipe: React.FC<propsType> = (props: propsType) => {
  //検索ボックスのステート
  const [input, setinput] = useState<string>("");

  //エンターを押したら検索結果が親のRecipe[]のステートがセットされる
  const filerandsetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const filteredRecipes = props.recipes.filter((recipe) => {
        return recipe.name.includes(input);
      });
      // 検索してフィルターしたレシピをセット
      props.setFilRecipes(filteredRecipes);
      // inputが''でない時は検索中
      input !== "" ? props.setFilteringNow(true) : props.setFilteringNow(false);
    }
  };

  //ばつボタン用のリスト初期化関数
  const resetRicipes = () => {
    setinput("");
  };

  return (
    <div className="mt-2 px-1 w-full flex items-center bg-gray-200 rounded-2xl">
      <FiSearch size={27} color="gray" className="ms-3 h-12" />
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setinput(event.target.value);
          event.target.value === "" ? props.setFilteringNow(false) : null;
        }}
        onKeyDown={filerandsetter}
        placeholder="レシピを検索"
        className="ps-2 pe-6 w-full text-lg border-spacing-4 bg-gray-200 border-gray-50 rounded-2xl focus:outline-none"
      />
      <button className="mr-4 ml-3 right-10" onClick={resetRicipes}>
        ✕
      </button>
    </div>
  );
};

export default SearchRecipe;
