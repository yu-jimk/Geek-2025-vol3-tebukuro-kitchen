import { supabase } from "./supabase";
import { Descript, Ingredient } from "../types";

export async function updateRecipeImage(id: number, image_url: string) {
  const { error } = await supabase
    .from("Recipes")
    .update({ image_url: image_url })
    .eq("id", id);
  if (error) {
    console.error("supabaseエラー", error.message);
  }
}

// Ingredientをupdateすることは今のところない
// export async function UpdateIngredient(id: number, image_url: string) {
//   const { error } = await supabase
//     .from("Ingredients")
//     .update({ image_url: image_url })
//     .eq("id", id);
// }
export async function ExchengeIngredient(ing1: Ingredient, ing2: Ingredient) {
  const { error } = await supabase
    .from("Ingredients")
    .update({
      name: ing2.name,
      amount: ing2.amount,
    })
    .eq("id", ing1.id);
  supabase
    .from("Ingredients")
    .update({
      name: ing1.name,
      amount: ing1.amount,
    })
    .eq("id", ing2.id);

  if (error) {
    console.error("supabaseエラー", error.message);
  }
}

export async function updateDescriptsImage(id: number, image_url: string) {
  const { error } = await supabase
    .from("Descripts")
    .update({ image_url: image_url })
    .eq("id", id);
  if (error) {
    console.error("supabaseエラー", error.message);
  }
}

export async function ExchengeDescripts(des1: Descript, des2: Descript) {
  const { error } = await supabase
    .from("Descripts")
    .update({
      image_url: des2?.image_url,
      text: des2?.text,
    })
    .eq("id", des1.id);
  supabase
    .from("Descripts")
    .update({
      image_url: des1?.image_url,
      text: des1?.text,
    })
    .eq("id", des2.id);

  if (error) {
    console.error("supabaseエラー", error.message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayShuffle(array:any[]) {
  for(let i = (array.length - 1); 0 < i; i--){

    // 0〜(i+1)の範囲で値を取得
    const r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    const tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}