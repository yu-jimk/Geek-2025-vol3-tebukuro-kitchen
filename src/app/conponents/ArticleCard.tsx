import { Recipe } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  recipe: Recipe;
  from?: string;
};

const ArticleCard = (props: ArticleCardProps) => {
  const { recipe, from } = props;
  // const existImage: boolean = false;
  // console.log("This`s ArticleCard");

  if (recipe != null)
    return (
      <div className="py-3 px-4 bg-orange-100">
        <Link href={`/${recipe.id}`}>
          <div
            className="bg-gray-100 relative rounded-t-xl overflow-hidden"
            style={{ position: "relative", aspectRatio: "4 / 5" }}
          >
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
};
export default ArticleCard;
