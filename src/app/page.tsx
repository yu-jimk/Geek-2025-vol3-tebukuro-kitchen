'use client'

import {useEffect, useState } from "react";
import ArticleCard from "./conponents/ArticleCard";
import Footer from "./conponents/Footer";
import Header from "./conponents/Header";
import { getAllRecipes } from "./utils/supabaseFunctions";
import { Recipe } from "./types";
import { usePathname } from "next/navigation";


export default function Home() {

  const pathName = usePathname()

  const [list,setList]=useState<Recipe[]>([])
  useEffect (()=> {
      const setarticlelist = async()=>{
          const articlelist = await getAllRecipes()
          setList(articlelist)
      };
      setarticlelist()
  },[]);

  return (
    <div>
      <Header pathName={pathName}/>
      <div className="bg-orange-100 grid grid-cols-2">
      {list.map((recipe:Recipe)=>(
        <ArticleCard recipe={recipe}/>
      ))}
      </div>
      <Footer pathName={pathName}/>
    </div>
  );
}
