import { z } from "zod";

const MAX_IMAGE_SIZE = 5; // 5MB
// const IMAGE_TYPES = ['image/jpg', 'image/png'];
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};
const imageSchema = z
  // z.inferでSchemaを定義したときに型がつくようにするため
  .custom<File[]>()
  // //   必須にしたい場合
  //   .refine((file) => file.length !== 0, { message: '必須です' })
  // このあとのrefine()で扱いやすくするために整形
  .transform((file) => file[0])
  // ファイルサイズを制限したい場合
  .refine(
    (file) => {
      try {
        return sizeInMB(file.size) <= MAX_IMAGE_SIZE;
      } catch (error) {
        // ファイルサイズが存在しない場合は良いものとする
        return true;
      }
    },
    {
      message: `ファイルサイズは最大${MAX_IMAGE_SIZE}MBです`,
    }
  )
  // .nullish();
// // 画像形式を制限したい場合
// .refine((file) => IMAGE_TYPES.includes(file.type), {
//   message: '.jpgもしくは.pngのみ可能です',
// }),
// // string型 1から50文字
const IngredientSchema = z
  .array(
    z.object({
      name: z.string().min(1, "入力してください").max(20, "入力値が長すぎます"),
      amount: z
        .string()
        .min(1, "入力してください")
        .max(20, "入力値が長すぎます"),
    })
  )
  .min(1, { message: "入力してください" });
export type IngredientSchemaType = z.infer<typeof IngredientSchema>;
const DescriptSchema = z
  .array(
    z.object({
      text: z.string().min(0).max(20, "入力値が長すぎます"),
      image: imageSchema,
    })
  )
  .min(1, { message: "入力してください" });
export const RecipeObjectSchema = z.object({
  recipe_name: z
    .string()
    .min(1, "入力してください")
    .max(20, "入力値が長すぎます"),
  recipe_image: imageSchema,
  recipe_comment: z.string().min(0).max(25, "入力値が長すぎます"),
  time: z.string().min(0).max(20, "入力値が長すぎます"),
  how_many: z.string().min(0).max(20, "入力値が長すぎます"),
});
export type RecipeObjectSchemaType = z.infer<typeof RecipeObjectSchema>;
export type DescriptSchemaType = z.infer<typeof DescriptSchema>;
export const RecipeSchema = z.object({
  recipe: RecipeObjectSchema,
  ingredient: IngredientSchema,
  descript: DescriptSchema,
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;
