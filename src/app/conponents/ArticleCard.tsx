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
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-t-[7px] object-cover"
            onError={() => console.error("Image failed to load")}
          />
        ) : (
          <FiCameraOff size={30} stroke="#737373" />
        )}
      </div>
    if(recipe != null)
      return (
        <div className="py-3 px-4 bg-orange-100" >
              <Link href={`/${recipe.id}`}>
              <div className="bg-gray-100 relative rounded-t-xl overflow-hidden"style={{ position: 'relative', aspectRatio: '4 / 5' }}>
                  <Image 
                      src={`/${recipe.image_url}`}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                  />
              </div>
              <div className="h-24 border-t-4 border-orange-400 rounded-b-xl bg-white">
                  {recipe.name}
              </div>
          </Link>
        </div>
      );

export default ArticleCard;
