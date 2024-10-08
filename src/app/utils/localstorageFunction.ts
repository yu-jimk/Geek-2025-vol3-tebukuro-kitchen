import { Recipe } from "@/app/types";

export const getFavoriteRecipes = (): Recipe[] => {
  return JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
};

export const setFavoriteRecipes = (recipes: Recipe[]) => {
  localStorage.setItem("favoriteRecipes", JSON.stringify(recipes));
};
