"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getPageRecipes } from "@/app/utils/supabaseFunctions";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import SearchRecipe from "@/app/conponents/SearchRecipe";

import LoadingDataFetch from "@/app/conponents/LoadingDataFetch";

export default function Home() {
  const pathName = usePathname();
  const [RecipesList, setRecipesList] = useState<Recipe[]>([]); //フィルターされてないレシピ
  const [filRecipes, setFilRecipes] = useState<Recipe[]>([]); //検索時のフィルターされたレシピ
  const [filteringNow, setFilteringNow] = useState(false);
  const [showHeadFooter, setshowshowHeadFooter] = useState(true);
  // 無限スクロール用のState
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  // スクロールで底に行ったらpageRecipeを更新
  useEffect(() => {
    getPageRecipes(page, RecipesList, setRecipesList);
  }, [page]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);
<!--     main
  const [RecipesBase, setRecipesBase] = useState<Recipe[]>([]); //一番最初に映るレシピ
  const [RecipesList, setRecipesList] = useState<Recipe[]>([]); //現在写しているレシピ
  const [showHeadFooter, setshowshowHeadFooter] = useState(true);
  const [isloading, setIsLoading] = useState(true); -->

  //スクロールを検知する
  const handlers = useSwipeable({
    onSwipedUp: () => setshowshowHeadFooter(false),
    onSwipedDown: () => setshowshowHeadFooter(true),
    delta: 60,
  });
<!-- main
  useEffect(() => {
    const setAllRecipes = async () => {
      setRecipesBase(await getAllRecipes());
      setRecipesList(await getAllRecipes());
    };
    setAllRecipes();
    setIsLoading(false);
  }, []);

  //検索用コンポーネントに渡す用のセット関数
  //現在映しているレシピをセットするようにしてください
  const recipessetter = (newrecipeslist: Recipe[]) => {
    setRecipesList(newrecipeslist);
  }; -->
  return (
    <div
      {...handlers}
      className="min-h-screen flex flex-col contain-paint bg-[#FFFBF4]"
    >
      <div
        className={`bg-white sticky top-0 px-2 w-full z-20 border-b-2 border-black transition-transform duration-200 ${
          showHeadFooter ? "translate-y-0" : "-translate-y-full"
        }`}

        <SearchRecipe
          recipes={RecipesList}
          setFilRecipes={setFilRecipes}
          setFilteringNow={setFilteringNow}
        />
        <Header pathName={pathName} />
      </div>
      <div
        className={`bg-[#FFFBF4] border-none flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min gap-5 p-5`}
      >
        {/* 検索中なら filRecipesを、そうでないならRecipesListを表示*/}
        {filteringNow
          ? filRecipes.map((filRecipe) => {
              return <ArticleCard key={filRecipe.id} recipe={filRecipe} />;
            })
          : RecipesList.map((recipe) => {
              return <ArticleCard key={recipe.id} recipe={recipe} />;
            })}
      </div>
      <div ref={loader}></div>
<!-- main
        <SearchRecipe recipes={RecipesBase} setlist={recipessetter} />
        <Header pathName={pathName} />
      </div>

      {isloading ? (
        <LoadingDataFetch />
      ) : (
        <div
          className={`bg-[#FFFBF4] border-none flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min gap-5 p-5`}
        >
          {RecipesList.map((recipe: Recipe) => (
            <ArticleCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
 -->
      <div
        className={`sticky bottom-0 w-full z-20 transition-transform duration-200 ${
          showHeadFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer pathName={pathName} />
      </div>
    </div>
  );
}
