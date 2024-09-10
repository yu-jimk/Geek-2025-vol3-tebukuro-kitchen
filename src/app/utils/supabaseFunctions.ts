import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { Descript, Ingredient } from "../types";

// export const getAllTodos = async () => {
//   const todos = await supabase.from("todo").select("*");
//   return todos.data;
// };

// export const addTodo = async (title: string) => {
//   await supabase.from("todo").insert({ title: title });
// };
// export const deleteTodo = async (id: number) => {
//   await supabase.from("todo").delete().eq("id", id);
// };


export const getAllRecipes  = async () => {
  const recipes = await supabase.from("Recipes").select("*");
  return recipes.data;
};

export const deleteRecipe = async (id: number) => {
  await supabase.from("Recipes").delete().eq("id", id);
};

export const getByIngredientId  = async (recipe_id:number) => {

  const Ingredients:PostgrestSingleResponse<Ingredient[]> = await supabase.from("Ingredients").select("*").eq("recipe_id",recipe_id);
  if(Ingredients.data === null){
    return -1;
  }
  return Ingredients.data;
};
export const  getByDescriptId = async (recipe_id:number) => {

  const Descripts: PostgrestSingleResponse<Descript[]> = await supabase.from("Descripts").select("*").eq("recipe_id",recipe_id);
  if(Descripts.data === null){
    return -1;
  }
  return Descripts.data;
};
