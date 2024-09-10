// export interface Todo {
//     id: number;
//     title: string;
//   }
// レシピ
export type Recipe = {
  id: number;
  name: string;
  image_url?: string;
  time?: string; //料理時間
  comment?: string;
  howmany: string; //何人前
};
// 材料
export type Ingredient = {
  id: number;
  recipe_id: number;
  name: string;
  amount: string;
};
// 作り方説明
export type Descript = {
  id: number;
  recipe_id: number;
  image_url?: string;
  text?: string;
};
