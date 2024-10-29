import { SubmitHandler, useForm } from "react-hook-form";
import { RecipeSchema, RecipeSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addRecipe,
  addSomeDescript,
  addSomeIngredient,
  getImageUrl,
  uploadImage,
} from "../utils/supabaseFunctions";
import { getFileExtension } from "../utils/fileUtils";
import { updateRecipeImage } from "../utils/supabaseFncUpdate";
export const useRecipeFormTop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeSchemaType>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      recipe: { recipe_name: "", recipe_comment: "", time: "", how_many: "" },
      ingredient: [
        { name: "", amount: "" },
        { name: "", amount: "" },
      ],
      descript: [
        { text: "", image: undefined },
        { text: "", image: undefined },
      ],
    },
  });

  const onSubmit: SubmitHandler<RecipeSchemaType> = async (data) => {
    console.log("onSubmit!!");
    console.log("onSubmit!!", data);
    const recipe_id = await addRecipe(data.recipe);
    if (recipe_id !== undefined) {
      if (data.recipe.recipe_image !== undefined) {
        const extension = getFileExtension(data.recipe.recipe_image);
        const imagePath = `${recipe_id}/recipe.${extension}`;
        await uploadImage(data.recipe.recipe_image, imagePath);
        const recipeImageUrl = await getImageUrl(imagePath);
        updateRecipeImage(recipe_id, recipeImageUrl);
      }
      addSomeDescript(recipe_id, data.descript);
      addSomeIngredient(recipe_id, data.ingredient);
    }

    window.alert("レシピが登録できました！");
    return true;
  };
  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
