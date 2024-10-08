/* eslint-disable jsx-a11y/alt-text */
import React from "react";
// import { FaPen } from "react-icons/fa";
// import { WiTime4 } from "react-icons/wi";
// import { BiBookmark } from "react-icons/bi";
import { DescriptInputItem } from "@/app/conponents/DescriptInputItem";
import { BiPlus } from "react-icons/bi";
import { BiCamera } from "react-icons/bi";
import { BiCameraOff } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const Registration = () => {
  return (
    <div>
      <main style={{ backgroundColor: "#FFFBF4" }}>
        <div>
          <p className="text-center font-semibold text-lg pt-4">レシピを登録</p>
        </div>

        <div className="bg-gray-200 h-56 w-9/12 mx-auto rounded-xl mt-10 mb-12 shadow-lg flex-col flex gap-y-4 justify-center items-center relative">
          <BiCameraOff className="text-gray-400 text-6xl" />
          <p className="text-gray-400">料理の写真を選択してください</p>
          <button className="w-6 h-6 rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2 flex justify-center items-center">
            <BiPlus className="rotate-45 text-2xl text-white" />
          </button>
          <button className="w-12 h-12 rounded-full shadow-lg absolute right-0 bottom-0 bg-white transform translate-x-4 translate-y-4 flex justify-center items-center">
            <BiCamera className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center border-b border-gray-400 bg-[#FEF9EC]">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="タイトル  /例  基本のチャーハン"
            style={{ height: "40px" }}
            className="w-full bg-[#FEF9EC] pl-3"
          />
        </div>

        <div>
          <input
            type="number"
            name="time"
            id="time"
            placeholder="時間  /例  約10分"
            style={{ height: "40px" }}
            className="w-4/10 mt-4 bg-[#FEF9EC] pl-3 border-b border-gray-400"
          />
        </div>

        <div className="relative inline-block">
          <Image
            className="py-4 pl-1 translate-y-4"
            alt={""}
            src="/Vector.png"
            height={30}
            width={80}
          />
          <p
            className="absolute inset-0 flex items-center justify-center font-semibold translate-y-4 text-gray-600"
            style={{ left: "-16px" }}
          >
            材料
          </p>
        </div>

        <div>
          <input
            type="number"
            name="people"
            id="people"
            placeholder="人数  /例  2人分"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-full border-b border-gray-400 mt-4 pl-3"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <input
            type="text"
            name="ingredient1"
            id="ingredient1"
            placeholder="材料  /例  たまご"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-full border-b border-gray-400 pl-3"
          />

          <input
            type="text"
            name="quantity1"
            id="quantity1"
            placeholder="分量  /例  2個"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-1/2 border-b border-gray-400 pl-3"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            name="ingredient2"
            id="ingredient2"
            placeholder="材料  /例  ごはん"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-full border-b border-gray-400 pl-3"
          />

          <input
            type="text"
            name="quantity2"
            id="quantity2"
            placeholder="分量  /例  2号"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-1/2 border-b border-gray-400 pl-3"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            name="ingredient3"
            id="ingredient3"
            placeholder="材料  /例  ネギ"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-full border-b border-gray-400 pl-3"
          />

          <input
            type="text"
            name="quantity3"
            id="quantity3"
            placeholder="分量  /例  適量"
            style={{ backgroundColor: "#FEF9EC", height: "40px" }}
            className="w-1/2 border-b border-gray-400 pl-3"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button className="text-orange-400  mb-4">
            <BiPlus className="text-2xl" />
          </button>
          <button className="text-orange-400 mb-4">項目を増やす</button>
        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            作り方
          </p>

          <div className="grid grid-cols-2 gap-4 p-4">
            <DescriptInputItem />
            <DescriptInputItem />
            <DescriptInputItem />
            <DescriptInputItem />
          </div>

          <div className="flex justify-center mt-4">
            <button className="text-orange-400">
              <BiPlus className="text-2xl" />
            </button>
            <button className="text-orange-400">項目を増やす</button>
          </div>
        </div>

        <div className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            料理の詳細
          </p>
          <textarea
            name="detail"
            id="detail"
            className="w-full border border-gray-500"
            rows={4}
          ></textarea>
        </div>

        <Link
          href="#"
          className="flex justify-center text-white bg-orange-400 hover:bg-orange-400 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
        >
          レシピを登録する
        </Link>
      </main>
    </div>
  );
};

export default Registration;
