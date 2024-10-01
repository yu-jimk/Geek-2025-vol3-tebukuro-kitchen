import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { Descript, Ingredient, Recipe } from "../types";
export const getAllRecipes = async () => {
  const recipes = await supabase.from("Recipes").select("*");
  // if(recipes.data !== null){
  //   recipes.data.sort((firstItem:Recipe, secondItem:Recipe) => firstItem.id - secondItem.id);
  // }
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
  const ingredients: PostgrestSingleResponse<Ingredient[]> = await supabase
    .from("Ingredients")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (ingredients.data !== null) {
    ingredients.data.sort(
      (firstItem: Ingredient, secondItem: Ingredient) =>
        firstItem.id - secondItem.id
    );
  }
  return ingredients.data as Ingredient[];
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
  const descripts: PostgrestSingleResponse<Descript[]> = await supabase
    .from("Descripts")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (descripts.data !== null) {
    descripts.data.sort(
      (firstItem: Descript, secondItem: Descript) =>
        firstItem.id - secondItem.id
    );
  }
  return descripts.data as Descript[];
};

export const addDescript = async (
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

export const showImage = async (filePath: string) => {
  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  const imageUrl = data.publicUrl;
  return imageUrl;
};
