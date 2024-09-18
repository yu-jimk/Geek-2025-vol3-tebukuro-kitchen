"use client";

import React from "react";
import Image from "next/image";
import { CgShapeCircle } from "react-icons/cg";

//データベースからの取得は後！！！
const Cook = () => {
  return (
    <>
      <div className="bg-orange-400 h-20">Header置くとこ（サイズは適当）</div>
      <div className="flex justify-center content-center">
        <Image src="" alt="" width={400} height={400} className="shadow-md"/>
      </div>
      <div className="mt-5 mb-10 flex justify-center">
        <CgShapeCircle className="mx-1 text-black"/>
        <CgShapeCircle className="mx-1 text-black"/>
        <CgShapeCircle className="mx-1 text-black"/>
      </div>
      <div className="font-bold text-center text-black text-3xl">説明がここに入るよ</div>
    </>
  );
};

export default Cook;
