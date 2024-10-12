import { Recipe } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { FiCameraOff } from "react-icons/fi";

type ArticleCardProps = {
  recipe: Recipe;
  from?: string;
};

const ArticleCard = (props: ArticleCardProps) => {
  const { recipe, from } = props;
  // const existImage: boolean = false;
  // console.log("This`s ArticleCard");

  return (
    <Link
      href={`/${recipe.id}${from ? `?from=${from}` : ""}`}
      className="border-[1px] border-gray-400 rounded-lg"
    >
      <div className="relative rounded-t-[7px] overflow-hidden aspect-[7/10] flex justify-center items-center bg-gray-100">
        {recipe.image_url ? (
          <Image
            // src={`https://picsum.photos/${recipe.id + 500}`}
            src={recipe.image_url}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-[7px] object-cover"
          />
        ) : (
          <FiCameraOff size={30} stroke="#9ca3af" />
        )}
      </div>

      <p className="h-12 border-t-4 border-t-orange-400 rounded-b-lg bg-white font-semibold text-sm p-1">
        {recipe.name}
      </p>
    </Link>
  );
};

export default ArticleCard;
