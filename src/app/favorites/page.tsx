'use client'

import React, { useEffect, useState } from 'react'
import Header from '../conponents/Header'
import { usePathname } from 'next/navigation'
import Footer from '../conponents/Footer'
import ArticleCard from '../conponents/ArticleCard'

const Favorites = () => {
  const [lecipies, setlecipes] = useState<string[]>([]);

  useEffect(() => {
    const favorritesList = localStorage.getItem('numbersArray');
    if (favorritesList) {
      setlecipes(JSON.parse(favorritesList));
    }
  }, []);

  const pathName = usePathname()

  return (
    <div>
      <Header pathName={pathName}/>
      <div className="bg-orange-100 grid grid-cols-2">
      {lecipies.map((id:string)=>(
        <ArticleCard recipe = {undefined} id={id}/>
      ))}
      </div>
      <Footer pathName={pathName} />
      </div>
  )
}

export default Favorites