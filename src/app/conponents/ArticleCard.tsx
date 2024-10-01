'use client'

import Link from "next/link";
import Image from "next/image";
import { Recipe } from "../types";

type prop_type ={
  recipe : Recipe;
};

  const ArticleCard = (recipe:prop_type) => {

    return (
      <div className="py-3 px-4  bg-orange-100 " >
            <Link href={`/${recipe.recipe.id}`}>
            <div className="relative rounded-t-xl overflow-hidden"style={{ position: 'relative', aspectRatio: '4 / 5' }}>
                <Image 
                    src={`/${recipe.recipe.image_url}`}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                />
            </div>
            <div className="h-24 border-t-4 border-orange-500 rounded-b-xl bg-white">
                {recipe.recipe.name}
            </div>
        </Link>
      </div>
    );
  };
  
  export default ArticleCard;