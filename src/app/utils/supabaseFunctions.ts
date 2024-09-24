import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { Descript, Ingredient, Recipe } from "../types";

export const getAllRecipes = async () => {
  const recipes = await supabase.from("Recipes").select("*");
  // 強制的にRecipe[]として認識させる
  return recipes.data as Recipe[];
};

export const addRecipe = async (
  name: string,
  image_url?: string,
  how_many?: string,
  time?: string,
  comment?: string
) => {
  await supabase.from("Recipes").insert({
    name: name,
    image_url: image_url,
    how_many: how_many,
    time: time,
    comment: comment,
  });
};

export const deleteRecipe = async (id: number) => {
  await supabase.from("Recipes").delete().eq("id", id);
};

export const getByIngredientId = async (recipe_id: number) => {
  const Ingredients: PostgrestSingleResponse<Ingredient[]> = await supabase
    .from("Ingredients")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (Ingredients.data === null) {
    return -1;
  }
  return Ingredients.data;
};

export const addIngredient = async (
  recipe_id: number,
  name: string,
  amount: string
) => {
  await supabase.from("Ingredients").insert({
    recipe_id: recipe_id,
    name: name,
    amount: amount,
  });
};

export const getByDescriptId = async (recipe_id: number) => {
  const Descripts: PostgrestSingleResponse<Descript[]> = await supabase
    .from("Descripts")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (Descripts.data === null) {
    return -1;
  }
  return Descripts.data;
};

export const addDescript = async (
  recipe_id: number,
  image_url?: string,
  text?: string
) => {
  await supabase.from("Ingredients").insert({
    recipe_id: recipe_id,
    image_url: image_url,
    text: text,
  });
};
