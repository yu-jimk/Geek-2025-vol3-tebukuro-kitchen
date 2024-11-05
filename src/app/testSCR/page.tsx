"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabase";
import { Recipe } from "../types";
import { arrayShuffle } from "../utils/supabaseFncUpdate";

const PAGE_SIZE = 10;

export default function MyComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [page, setPage] = useState(1);
  const [pageRecipe, setPageRecipe] = useState<Recipe[]>([]);
  const loader = useRef(null);
  const getPageRecipes = async (pageNumber: number,pageRecipe: Recipe[]) => {
    const recipes = await supabase
      .from("Recipes")
      .select("*")
      .range((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE - 1);
    if (recipes.data !== null) {
        recipes.data = arrayShuffle(recipes.data) as Recipe[];
    }
    if (recipes.error) {
      console.error("supabaseエラー", recipes.error);
    }
    else setPageRecipe([...pageRecipe,...recipes.data as Recipe[]] as Recipe[])
    // 強制的にRecipe[]として認識させる
  };

  useEffect(() => {
    getPageRecipes(page,pageRecipe)
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

  return (
    <div>
      {pageRecipe.map((item) => (
        <div key={item.id} className='mb-20'>id={item.id}{item.name}</div>
      ))}
      <div ref={loader}>Loading more...</div>
    </div>
  );
}
