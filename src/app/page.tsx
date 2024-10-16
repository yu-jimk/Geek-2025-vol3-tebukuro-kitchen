"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getAllRecipes } from "@/app/utils/supabaseFunctions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const pathName = usePathname()
  const [list,setList]=useState<Recipe[]>([])
  const [showlist,setshowlist] = useState(true)

  console.log('This`s /page.tsx')

  const handlers = useSwipeable({
    onSwipedUp:() => setshowlist(false),
    onSwipedDown:()=> setshowlist(true),
    delta: 20,
  });

  useEffect (()=> {
      const setarticlelist = async()=>{
          const articlelist = await getAllRecipes()
          setList(articlelist)
      };
      setarticlelist()
  },[]);

  return (
    <div {...handlers} className="bg-orange-100">
      {showlist &&
        <Header pathName={pathName}/>
      }
      
      <div className="border-none grid grid-cols-2">
      {list.map((recipe:Recipe)=>(
        <ArticleCard recipe={recipe}/>
      ))}
      </div>
      {showlist &&
        <Footer pathName={pathName}/>
      }
    </div>
  );
}
