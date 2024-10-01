import React from 'react'
import { FaPen } from "react-icons/fa";
import { WiTime4 } from "react-icons/wi";
import { BiBookmark } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiCameraOff } from "react-icons/bi";
import Link from 'next/link';

const Registration = () => {
  return (
    <div>
      <main style={{ backgroundColor: '#FFFBF4' }}>
        <div>
          <p className="text-center font-semibold text-lg mt-4">
            レシピを登録
          </p>
        </div>

        <div className="bg-gray-200 h-56 w-9/12 mx-auto rounded-xl mt-10 mb-12 shadow-md flex-col flex gap-y-4 justify-center items-center">   
            <BiCameraOff className="text-gray-400 text-6xl"/>
            <p className="text-gray-400">料理の写真を選択してください</p>
        </div>

        <button className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg absolute bottom-[600px] right-8 bg-white">
          
          </button>

        <div className="flex items-center border-b border-gray-400 bg-[#FEF9EC]">
          
          <input type="text" name="title" id="title" placeholder="タイトル" style={{  height: '40px' }} className="w-full bg-[#FEF9EC]" />
        </div>

        <div className="flex items-center border-b border-gray-400 bg-[#FEF9EC]">
          <input type="number" name="time" id="time" placeholder="時間" style={{ height: '40px' }} className="w-4/10 mt-4 bg-[#FEF9EC]" />
        </div>

        <img className=""
        src="bookmark.png"
        />

        <div>
          <input type="number" name="people" id="people" placeholder="人数" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-full border-b border-gray-400 mt-4" />
        </div>

        <div className="flex gap-4 mt-4">
          <input type="text" name="ingredient1" id="ingredient1" placeholder="材料" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-full border-b border-gray-400" />

          <input type="text" name="quantity1" id="quantity1" placeholder="分量" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-1/2 border-b border-gray-400" />
        </div>

        <div className="flex gap-4">
          <input type="text" name="ingredient2" id="ingredient2" placeholder="材料" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-full border-b border-gray-400" />

          <input type="text" name="quantity2" id="quantity2" placeholder="分量" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-1/2 border-b border-gray-400" />
        </div>

        <div className="flex gap-4">
          <input type="text" name="ingredient3" id="ingredient3" placeholder="材料" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-full border-b border-gray-400" />

          <input type="text" name="quantity3" id="quantity3" placeholder="分量" style={{ backgroundColor: '#FEF9EC', height: '40px' }} className="w-1/2 border-b border-gray-400" />
        </div>

        <div className="flex justify-center mt-4">
          <button className="text-orange-500 mb-3">
            項目を増やす
          </button>
        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            作り方
          </p>

          <div className="flex gap-4 mt-4">
            <div className="bg-gray-200 h-32 w-1/2 shadow-md">
              {/* グレーの長方形1 */}
            </div>
            <div className="bg-gray-200 h-32 w-1/2 shadow-md">
              {/* グレーの長方形2 */}
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {/* テキスト欄1 */}
            <input
              type="text"
              className="h-16 w-1/2"
              placeholder="テキスト欄1"
            />

            {/* テキスト欄2 */}
            <input
              type="text"
              className="h-16 w-1/2"
              placeholder="テキスト欄2"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button className="text-orange-500">
              項目を増やす
            </button>
          </div>

        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            料理の詳細
          </p>
          <textarea name="detail" id="detail" className="w-full border border-gray-500" rows={4}></textarea>
        </div>

        <Link
          href="#"
          className="flex justify-center text-white bg-orange-400 hover:bg-orange-500 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
        >
          レシピを登録する
        </Link>
      </main>
    </div>

  )
}

export default Registration