import { z } from "zod";
const MAX_TEXT = [20, 30, 45, 50, 300];
const MAX_IMAGE_SIZE = 30; // 30MB
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
  );
// // 画像形式を制限したい場合
// .refine((file) => IMAGE_TYPES.includes(file.type), {
//   message: '.jpgもしくは.pngのみ可能です',
// }),
// // string型 1から50文字
const IngredientSchema = z
  .array(
    z.object({
      name: z
        .string()
        .min(1, "必須です")
        .max(30, `${MAX_TEXT[1]}文字以下にしてください`),
      amount: z
        .string()
        .min(1, "必須です")
        .max(20, `${MAX_TEXT[0]}文字以下にしてください`),
    })
  )
  .min(1, { message: "必須です" });
export type IngredientSchemaType = z.infer<typeof IngredientSchema>;
const DescriptSchema = z
  .array(
    z.object({
      text: z.string().min(0).max(45, `${MAX_TEXT[2]}文字以下にしてください`),
      image: imageSchema,
    })
  )
  .min(1, { message: "必須です" });
export const RecipeObjectSchema = z.object({
  recipe_name: z
    .string()
    .min(1, "必須です")
    .max(50, `${MAX_TEXT[3]}文字以下にしてください`),
  recipe_image: imageSchema,
  recipe_comment: z
    .string()
    .min(0)
    .max(300, `${MAX_TEXT[4]}文字以下にしてください`),
  time: z.string().min(0).max(20, `${MAX_TEXT[0]}文字以下にしてください`),
  how_many: z.string().min(0).max(20, `${MAX_TEXT[0]}文字以下にしてください`),
});
export type RecipeObjectSchemaType = z.infer<typeof RecipeObjectSchema>;
export type DescriptSchemaType = z.infer<typeof DescriptSchema>;
export const RecipeSchema = z.object({
  recipe: RecipeObjectSchema,
  ingredient: IngredientSchema,
  descript: DescriptSchema,
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;
