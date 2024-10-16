'use client'

import Link from "next/link";
import Image from "next/image";
import { Recipe } from "../types";

type prop_type ={
  recipe? : Recipe;
  id?:string
};

  const ArticleCard = (prop:prop_type) => {

    const{recipe,id}=prop
    console.log('This`s ArticleCard')

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

    if(id != null)
      return (
        <div className="py-3 px-4  bg-orange-100 " >
              <Link href={`/${id}`}>
              <div className="relative rounded-t-xl overflow-hidden"style={{ position: 'relative', aspectRatio: '4 / 5' }}>
                  <Image 
                      src={`/${null}`}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                  />
              </div>
              <div className="h-24 border-t-4 border-orange-500 rounded-b-xl bg-white">
                  {null}
              </div>
          </Link>
        </div>
      );
    }
  
  
  export default ArticleCard;