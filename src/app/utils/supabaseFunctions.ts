import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { Descript, Ingredient, Recipe } from "../types";
// 全レシピ取得
export const getAllRecipes = async () => {
  const recipes = await supabase.from("Recipes").select("*");
  // if(recipes.data !== null){
  //   recipes.data.sort((firstItem:Recipe, secondItem:Recipe) => firstItem.id - secondItem.id);
  // }
  // 強制的にRecipe[]として認識させる
  return recipes.data as Recipe[];
};
// レシピのidより1つのレシピ取得
export const getRecipesbyId = async (id:number) => {
  const recipe = await supabase.from("Recipes").select("*").eq("id",id);
  // if(recipes.data !== null){
  //   recipes.data.sort((firstItem:Recipe, secondItem:Recipe) => firstItem.id - secondItem.id);
  // }
  // 強制的にRecipe[]として認識させる
  return recipe.data as Recipe[];
};
// レシピ作成
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
// レシピ削除
export const deleteRecipe = async (id: number) => {
  await supabase.from("Recipes").delete().eq("id", id);
};
// レシピのidより材料取得
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
// 材料作成
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
// レシピのidより説明取得
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
// 説明作成
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
// 画像名より画像のurl取得
export const getImageUrl = async (filePath: string) => {
  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  const imageUrl = data.publicUrl;
  return imageUrl;
};
