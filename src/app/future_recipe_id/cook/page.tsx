"use client";

import React, { useState } from "react";
import Image from "next/image";

//データベースからの取得は後。仮データ
const page: number = 3; //ページ数

//丸を描画する関数　count=丸の数　id=丸のkey
const Circle = ({ count, id }: { count: number; id: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`mx-2 w-2 h-2 border border-black rounded-full ${
            id == index ? "bg-orange-400" : ""
          }`}
        ></div>
      ))}
    </>
  );
};

const Cook = () => {
  const [id, setId] = useState(0); //現在のページ
  return (
    <>
      <div className="bg-orange-400 h-20">Header置くとこ（サイズは適当）</div>

      <div className="flex justify-center content-center">
        <Image src="" alt="" width={500} height={400} className="shadow-md" />
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <Circle count={page} id={id} />
      </div>
      <div className="mx-5 font-bold text-center text-black text-3xl">
        フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。
      </div>

      <div className="text-black flex justify-between">
        <button
          onClick={() => id==0 ? setId(id) : setId(id-1)}
          className="w-10 h-10 bg-orange-400"
        >
          前へ
        </button>
        <button
          onClick={() => id==page-1 ? setId(id) : setId(id+1)}
          className="w-10 h-10 bg-orange-400"
        >
          次へ
        </button>
      </div>
    </>
  );
};

export default Cook;
