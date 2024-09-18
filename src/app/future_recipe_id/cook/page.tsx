"use client";

import React from "react";
import Image from "next/image";
import { CgShapeCircle } from "react-icons/cg";

//データベースからの取得は後。仮データ
const page: number = 3; //ページ数

const Circle = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mx-2 w-2 h-2 border border-black rounded-full"></div>
      ))}
    </>
  );
};

const Cook = () => {
  return (
    <>
      <div className="bg-orange-400 h-20">Header置くとこ（サイズは適当）</div>

      <div className="flex justify-center content-center">
        <Image src="" alt="" width={500} height={400} className="shadow-md" />
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <Circle count={page}/>
      </div>
      <div className="mx-5 font-bold text-center text-black text-3xl">
        フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。
      </div>
    </>
  );
};

export default Cook;
