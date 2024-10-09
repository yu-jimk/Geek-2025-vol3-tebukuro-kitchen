"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getFavoriteRecipes } from "@/app/utils/localstorageFunction";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Favorites = () => {
  const pathName = usePathname();

  const [list, setList] = useState<Recipe[]>([]);

  useEffect(() => {
    const favoriteRecipes: Recipe[] = getFavoriteRecipes();
    setList(favoriteRecipes);
  }, []);

  return (
    <div>
      <Header pathName={pathName} />
      <div className="bg-orange-100 grid grid-cols-2">
        {list.map((recipe: Recipe) => (
          <ArticleCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <Footer pathName={pathName} />
    </div>
  );
};

export default Favorites;
