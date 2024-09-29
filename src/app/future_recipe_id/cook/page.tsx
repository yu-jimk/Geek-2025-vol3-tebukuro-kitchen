"use client";

import React, { useState } from "react";
import Image from "next/image";
import Speech from "@/app/conponents/Speech";
import Modal from "./Modal";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { createPortal } from "react-dom";

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

const ModalContainer = ({ children }: { children: React.JSX.Element }) => {
  const container = document.getElementById("container");
  if (container) {
    return createPortal(children, container);
  }
};

const Cook = () => {
  const [id, setId] = useState(0); //現在のページ
  const [modalOpen, setModalOpen] = useState(false);
  const back = (
    num: number,
    setId: React.Dispatch<React.SetStateAction<number>>
  ) => {
    num == 0 ? setId(num) : setId(num - 1);
  };
  const next = (
    num: number,
    page: number,
    setId: React.Dispatch<React.SetStateAction<number>>
  ) => {
    num == page - 1 ? setId(num) : setId(num + 1);
  };
  return (
    <>
      <Speech next={next} back={back} num={id} page={page} setId={setId} />

      <div className="flex justify-center content-center">
        <Image src="" alt="" width={500} height={400} className="shadow-md" />
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <Circle count={page} id={id} />
      </div>
      <div
        id="desc"
        className="mx-5 font-mono font-black text-left text-black text-2xl"
      >
        {text[id]}
      </div>

      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="bg-black fixed bottom-14"
      >
        材料表示
      </button>

      <div id="container">
        {modalOpen && (
          <ModalContainer>
            <Modal />
          </ModalContainer>
        )}
      </div>

      <div className="text-white flex justify-between fixed bottom-0 z-10 w-full h-14">
        <button
          onClick={() => (id == 0 ? setId(id) : setId(id - 1))}
          className="w-20 h-14 bg-transparent font-bold"
        >
          <FaArrowLeft className="w-6 h-6 mx-7" />
          前へ
        </button>
        <button
          onClick={() => (id == page - 1 ? setId(id) : setId(id + 1))}
          className="w-20 h-14 bg-transparent font-bold"
        >
          <FaArrowRight className="w-6 h-6 mx-7" />
          次へ
        </button>
      </div>
    </>
  );
};

export default Cook;
