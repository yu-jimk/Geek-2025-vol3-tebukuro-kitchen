"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getAllRecipes } from "@/app/utils/supabaseFunctions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const pathName = usePathname();

  const [list, setList] = useState<Recipe[]>([]);
  useEffect(() => {
    const setarticlelist = async () => {
      const articlelist = await getAllRecipes();
      setList(articlelist);
    };
    setarticlelist();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header pathName={pathName} />
      <div className="bg-[#FFFBF4] grid grid-cols-2 auto-rows-min gap-5 p-5 flex-grow">
        {list.map((recipe: Recipe) => (
          <ArticleCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <Footer pathName={pathName} />
    </div>
  );
}
