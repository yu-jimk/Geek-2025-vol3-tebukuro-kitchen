import { PostgrestSingleResponse } from "@supabase/supabase-js";
import {
  Descript,
  DetailRecipe,
  Ingredient,
  InputIngredient,
  Recipe,
  inputDescript,
} from "../types";
import { supabase } from "../utils/supabase";
import { getFileExtension } from "./fileUtils";
import { ExchengeDescripts, ExchengeIngredient } from "./supabaseFncUpdate";
// 全レシピ取得
export const getAllRecipes = async () => {
  const recipes = await supabase.from("Recipes").select("*");
  // 強制的にRecipe[]として認識させる
  return recipes.data as Recipe[];
};
// レシピのidより1つのレシピ取得
export const getRecipesbyId = async (id: number) => {
  const recipe = await supabase.from("Recipes").select("*").eq("id", id);
  // 強制的にRecipe[]として認識させる
  return recipe.data as Recipe[];
};
// レシピ作成
export const addRecipe = async (recipe: Recipe) => {
  const { data, error } = await supabase
    .from("Recipes")
    .insert({
      name: recipe.name,
      image_url: recipe?.image_url,
      how_many: recipe?.howmany,
      time: recipe?.time,
      comment: recipe?.comment,
    })
    .select(); // 挿入されたデータを取得するために select() を使用

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    // 挿入されたデータのIDを取得
    return data[0].id as number;
  }
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
    ingredients.data.sort((firstItem: Ingredient, secondItem: Ingredient) => {
      if (firstItem.index !== undefined && secondItem.index !== undefined) {
        return firstItem.index - secondItem.index;
      } else {
        return -1;
      }
    });
  }
  return ingredients.data as Ingredient[];
};
// 材料作成
export const addIngredient = async (
  recipe_id: number,
  name: string,
  amount: string
) => {
  await supabase
    .from("Ingredients")
    .insert({
      recipe_id: recipe_id,
      name: name,
      amount: amount,
    })
    .select(); // 挿入されたデータを取得するために select() を使用
};

// 複数個の材料作成
export const addSomeIngredient = async (
  recipe_id: number,
  inputIngredients: InputIngredient[]
) => {
  const { data, error } = await supabase
    .from("Ingredients")
    .insert({
      recipe_id: recipe_id,
      inputIngredients,
    })
    .select(); // 挿入されたデータからidと名前を取得
};
// レシピのidより作り方取得
export const getByDescriptId = async (recipe_id: number) => {
  const descripts: PostgrestSingleResponse<Descript[]> = await supabase
    .from("Descripts")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (descripts.data !== null) {
    descripts.data.sort((firstItem: Descript, secondItem: Descript) => {
      if (firstItem.index !== undefined && secondItem.index !== undefined) {
        return firstItem.index - secondItem.index;
      } else {
        return -1;
      }
    });
  }
  return descripts.data as Descript[];
};
// 材料作成
export const addDescript = async (
  recipe_id: number,
  // index?: number,
  image_url?: string,
  text?: string
) => {
  await supabase.from("Descripts").insert({
    recipe_id: recipe_id,
    // index: index,
    image_url: image_url,
    text: text,
  });
};
// 複数個の作り方を作成
export const addSomeDescript = async (
  recipe_id: number,
  inputDescripts: inputDescript[]
) => {
  inputDescripts.map(async (e, index) => {
    if (e.imageFile !== undefined) {
      const descriptExtension = getFileExtension(e.imageFile);
      const descriptImagePath = `${recipe_id}/Descripts/${index}.${descriptExtension}`;
      await uploadImage(e.imageFile, descriptImagePath);
      const image_url = await getImageUrl(descriptImagePath);
      console.log("image_url", image_url);
      // await addDescript(recipe_id,index, image_url, e.text);
      await addDescript(recipe_id, image_url, e.text);
    } else {
      await addDescript(recipe_id, undefined, e.text);
    }
  });
};
export const uploadImage = async (
  file: File,
  filePath: string
  // recipe_id: number
) => {
  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file);
  if (error) {
    console.error("supabaseエラー", error);
  }
};
// 画像名より画像のurl取得
export const getImageUrl = async (filePath: string) => {
  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  if (data === null) {
    console.error("画像が見つかりません");
    return "";
  }
  const imageUrl = data.publicUrl;
  return imageUrl;
};

export const getDetailRecipebyId = async (id: number) => {
  const detailRecipe: PostgrestSingleResponse<DetailRecipe> = await supabase
    .from("Recipes")
    .select("*, Descripts(*), Ingredients(*)")
    .eq("id", id)
    .single();
  // 強制的にRecipe[]として認識させる
  return detailRecipe.data as DetailRecipe;
};
