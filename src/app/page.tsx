'use client'

import {useEffect, useState } from "react";
import ArticleCard from "./conponents/ArticleCard";
import Footer from "./conponents/Footer";
import { getAllRecipes } from "./utils/supabaseFunctions";
import { Recipe } from "./types";
import { usePathname } from "next/navigation";
import Header from "./conponents/Header";
import { useSwipeable } from 'react-swipeable';


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
