import React from 'react'
import { FaPen } from "react-icons/fa";
import { WiTime4 } from "react-icons/wi";
import { BiBookmark } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import Link from 'next/link';

const Registration = () => {
  return (
    <div>
      <main style={{ backgroundColor: '#FFFBF4' }}>
      <div>
        <p className="text-center font-semibold text-lg">
        レシピを登録
        </p>
        </div>

      <div className='text-center'>
        画像を置くところ
        </div>

      <div>
        <input type="text" name="title" id="title" placeholder="タイトル" style={{ backgroundColor: '#FEF9EC' }} className="w-full border-b border-gray-400"/>
        </div>

      <div>
        <input type="number" name="time" id="time" placeholder="時間" style={{ backgroundColor: '#FEF9EC' }} className="w-full border-b border-gray-400"/>
        </div>
      
      <BiBookmark className="-rotate-90 bg-yellow-400">
      </BiBookmark>

      <div>
        <input type="number" name="people" id="people" placeholder="人数" style={{ backgroundColor: '#FEF9EC' }} className="w-full border-b border-gray-400"/>
        </div>

      <div>
        <input type="text" name="ingredient1" id="ingredient1" placeholder="材料" style={{ backgroundColor: '#FEF9EC' }} className="w-full border-b border-gray-400"/>
        </div>

      <div>
        <input type="text" name="ingredient2" id="ingredient2" placeholder="材料" style={{ backgroundColor: '#FEF9EC' }} className="w-full border-b border-gray-400"/>
        </div>

      <div>
        <input type="text" name="ingredient3" id="ingredient3" placeholder="材料" style={{ backgroundColor: '#FEF9EC' }} className="w-full border-b border-gray-400"/>
        </div>

        <div className="flex justify-center">
        <button className="text-orange-500 mb-3">
          項目を増やす
          </button>
        </div>

      <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
            作り方
          </p>

          <div className="flex gap-4 mt-4">
            <div className="bg-gray-300 h-32 w-1/2">
             {/* グレーの長方形1 */}
            </div>
            <div className="bg-gray-300 h-32 w-1/2">
            {/* グレーの長方形2 */}
            </div>
          </div>

          <div className="flex justify-center">
          <button className="text-orange-500">
          項目を増やす
          </button>
          </div>

        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
            コツ・ポイント
          </p>
          <textarea name="point" id="point" className="w-full border border-gray-500" rows={4}></textarea>
        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
            料理の詳細
          </p>
          <textarea name="detail" id="detail" className="w-full border border-gray-500" rows={4}></textarea>
        </div>

        <Link
          href="#"
          className="flex items-center justify-center text-white bg-orange-400 font-semibold rounded-xl text-lg  py-3 mx-20 my-8 shadow-md"
        >
          レシピを登録する
        </Link>
        </main>
    </div>
    
  )
}

export default Registration