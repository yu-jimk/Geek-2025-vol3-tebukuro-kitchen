'use client'

import React, { useState } from 'react'

const Header = () => {
    
    const [selectbutton, setselectbutton] = useState('レシピ')


  return (
    <div className='border-b-2 border-black w-full p-3'>

        <input className=' p-2 bg-gray-200 mt-3 mb-5 w-full text-2xl border-spacing- border border-gray-400 rounded-lg focus:outline-none' 
        type='text' 
        placeholder= 'レシピをさがす' />

        <div className='flex'>
            <div className='w-1/2 px-4 flex justify-center '>
                <button className={`px-4 py-2 ${selectbutton === 'レシピ' ? 'border-b-4 border-orange-500' : 'border-b-4 border-white'}`}
                onClick={() => setselectbutton('レシピ')}>
                    レシピ
                </button>
            </div>

            <div className='w-1/2 px-4 flex justify-center '>
                <button className={`px-4 py-2 ${selectbutton === 'お気に入り' ? 'border-b-4 border-orange-500' : 'border-b-4 border-white'}`}
                onClick={()=> setselectbutton('お気に入り')}>
                    お気に入り
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header