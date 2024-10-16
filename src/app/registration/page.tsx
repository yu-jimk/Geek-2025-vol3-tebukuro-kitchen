"use client";
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { FaPen } from "react-icons/fa";
import { WiTime4 } from "react-icons/wi";
// import { BiBookmark } from "react-icons/bi";
import DescriptInputItem from "@/app/conponents/DescriptInputItem";
import { BiCamera, BiCameraOff, BiPlus } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import IngredientInputItem from "@/app/conponents/IngredientInputItem";
import Footer from "../conponents/Footer";

const Registration = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <main className="bg-[#FFFBF4]">
        <p className="text-center font-semibold text-lg pt-4">レシピを登録</p>
        <section className="bg-gray-100 h-56 w-9/12 mx-auto rounded-xl mt-10 mb-12 shadow-lg flex-col flex gap-y-4 justify-center items-center relative">
          {selectedImage ? (
            <>
              <Image
                src={selectedImage}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                fill
              />
              <button className="w-6 h-6 rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2 flex justify-center items-center">
                <BiPlus className="rotate-45 text-2xl text-white" />
              </button>
            </>
          ) : (
            <>
              <BiCameraOff className="text-gray-400 text-6xl" />
              <p className="text-gray-400">料理の写真を選択してください</p>
            </>
          )}

          <div className="absolute right-[-16px] bottom-[-16px]">
            <button className="w-12 h-12 rounded-full shadow-lg bg-white flex justify-center items-center">
              <BiCamera className="text-2xl" style={{ color: "orange" }} />
            </button>

            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
        </section>

        <div>
          <span className="text-red-500 ml-3 text-2xl">*</span>
        </div>
        <section className="flex items-center border-b border-gray-400 bg-[#FEF9EC] -mt-3">
          <FaPen className="ml-3 text-gray-400 text-2xl" />
          <input
            type="text"
            name="title"
            id="title"
            placeholder="タイトル /例  基本のチャーハン"
            style={{ height: "40px", outline: "none" }}
            className="w-full bg-[#FEF9EC] pl-3"
          />
        </section>

        <section
          className="flex items-center w-1/5 border-b border-gray-400 bg-[#FEF9EC] mt-3"
          style={{ width: "200px" }}
        >
          <WiTime4 className="ml-3 mt-1 text-gray-400 text-3xl" />
          <input
            type="text"
            name="time"
            id="time"
            placeholder="時間  /例  約10分"
            style={{ height: "40px", outline: "none" }}
            className="pt-1 bg-[#FEF9EC] pl-2"
          />
        </section>
        <section>
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
              type="text"
              name="people"
              id="people"
              placeholder="人数  /例  2人分"
              style={{
                backgroundColor: "#FEF9EC",
                height: "40px",
                outline: "none",
              }}
              className="w-full border-b border-gray-400 mt-4 pl-3"
            />
          </div>
          <IngredientInputItem />
        </section>

        <section className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            作り方
          </p>
          <DescriptInputItem />
        </section>

        <section className="mx-4">
          <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
            料理の紹介
          </p>
          <textarea
            name="detail"
            id="detail"
            className="w-full border border-gray-500"
            style={{ outline: "none" }}
            rows={4}
          ></textarea>
        </section>

        <div>
          <Link
            href="#"
            className="flex justify-center text-white bg-orange-400 hover:bg-orange-400 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
          >
            レシピを登録する
          </Link>
          <div className="bg-[#FFFBF4] w-full h-8"></div>
        </div>
      </main>
      <Footer pathName="/registration" />
    </>
  );
};

export default Registration;
