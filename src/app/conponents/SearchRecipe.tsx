import React, { useEffect, useState } from 'react'
import { Recipe } from '../types'
import { FiSearch } from 'react-icons/fi'

type propsType = {
    recipes: Recipe[]
    setlist: (recipes: Recipe[]) => void
}

const SearchRecipe: React.FC<propsType> = (props: propsType) => {

    const [input, setinput] = useState<string>("")

    useEffect(() => {
        const filteredRecipes = props.recipes.filter((recipe) => {
            return recipe.name.includes(input)
        })
        props.setlist(filteredRecipes)
    }, [input])

    return (
            <div className="mt-2 px-1 w-full flex items-center bg-gray-200 rounded-2xl">
            <FiSearch size={27} color="gray" className="ms-3 h-12"/>
            <input 
                type="text"
                value={input}
                onChange={(event) => {setinput(event.target.value)}}
                placeholder="レシピを検索" 
                className='ps-2 pe-6 w-full text-lg border-spacing-4 bg-gray-200 border-gray-50 rounded-2xl focus:outline-none'
            />
            <button className='mr-4 ml-3 right-10' 
                onClick={()=>{setinput('')}}>✕</button>
            </div>
    )
}

export default SearchRecipe
