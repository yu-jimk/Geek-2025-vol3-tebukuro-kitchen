// export interface Todo {
//     id: number;
//     title: string;
//   }
export type Recipe = {
  id: number;
  name: string;
  image_url?: string;
  time?: number; //料理時間
  comment?: string;
  howmany: string; //何人前
};
export type Ingredient = {
  id: number;
  recipe_id: number;
  name: string;
  amount: string;
};
export type Descript = {
  id: number;
  recipe_id: number;
  image_url: string;
  text: string;
};
