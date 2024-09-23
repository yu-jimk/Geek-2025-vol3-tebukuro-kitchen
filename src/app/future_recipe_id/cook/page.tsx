"use client";

import React, { useState } from "react";
import Image from "next/image";
import Speech from "@/app/conponents/Speech";

//データベースからの取得は後。仮データ
const page: number = 3; //ページ数
const text: string[] = [
  "フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。",
  "お米を軽く炒め、卵とよく混ぜ合わせる。みじん切りにしたネギや、お好みの具材（ハム、エビ、野菜など）を加え、さらに炒める。",
  "全体がよく混ざり、具材が熱くなったら、塩とコショウで味を付ける。最後に、醤油を少々加え、全体をさっと炒めて香りを引き出す。",
];

//丸を描画する関数　count=丸の数　id=塗りつぶし判定用ページ数
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
  const back = (num:number, setId:Function) => {
    num == 0 ? setId(num) : setId(num - 1);
  }
  const next = (num:number, page:number, setId:Function) => {
    num == page - 1 ? setId(num) : setId(num + 1);
  }
  return (
    <>
      <Speech next={next} back={back} num={id} page={page} setId={setId}/>

      <div className="flex justify-center content-center">
        <Image src="" alt="" width={500} height={500} className="shadow-md" />
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <Circle count={page} id={id} />
      </div>
      <div className="mx-5 font-bold text-left text-black text-3xl">
        {text[id]}
      </div>

      <div className="text-black flex justify-between">
        <button
          onClick={() => (id == 0 ? setId(id) : setId(id - 1))}
          className="w-10 h-10 bg-orange-400"
        >
          前へ
        </button>
        <button
          onClick={() => (id == page - 1 ? setId(id) : setId(id + 1))}
          className="w-10 h-10 bg-orange-400"
        >
          次へ
        </button>
      </div>
    </>
  );
};

export default Cook;
