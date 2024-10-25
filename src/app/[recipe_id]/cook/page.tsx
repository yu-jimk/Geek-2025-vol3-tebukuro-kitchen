"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Speech from "@/app/conponents/Speech";
import IngModal from "../../future_recipe_id/cook/IngModal";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { PiNoteDuotone } from "react-icons/pi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { createPortal } from "react-dom";
import { getByDescriptId } from "@/app/utils/supabaseFunctions";
import { Descript } from "@/app/types";
import YtModal from "../../future_recipe_id/cook/YtModal";
import GuideModal from "../../future_recipe_id/cook/GuideModal";
import TimerModal from "../../future_recipe_id/cook/TimerModal";

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
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

const Cook = ({ params }: { params: { recipe_id: number } }) => {
  const [descript, setDescript] = useState<Descript[]>([]);
  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getByDescriptId(params.recipe_id);
      setDescript(recipes);
    };
    getRecipes();
  }, []);
  const page = descript.length;

  // useEffect(() => {
  //   const sorted = recipes.sort((a: Descript, b: Descript) => a.id - b.id);
  //   setRecipes(sorted);
  // }, []);

  const [id, setId] = useState(0); //現在のページ
  const [ingModalOpen, setIngModalOpen] = useState(false);
  const [ytModalOpen, setYtModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [str,setStr] = useState("")
  const [timerStart,setTimerStart] = useState(false)

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
      <Speech
        next={next}
        back={back}
        num={id}
        page={page}
        setId={setId}
        setIngModalOpen={setIngModalOpen}
        setYtModalOpen={setYtModalOpen}
        setKeyword={setKeyword}
        setGuideModalOpen={setGuideModalOpen}
        setTimerModalOpen={setTimerModalOpen}
        setStr={setStr}
        setTimerStart={setTimerStart}
      />

      <div className="flex justify-center content-center">
        <Image src="" alt="" width={500} height={400} className="shadow-lg" />
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <Circle count={page} id={id} />
      </div>
      <div
        id="desc"
        className="mx-5 font-mono font-black text-left text-black text-2xl"
      >
        {descript[id]?.text ?? "読み込み中・・・"}
      </div>

      {/* 動画表示デバッグ用 */}
      {/* <div className="w-full flex justify-between fixed bottom-14">
        <button
          onClick={() => setYtModalOpen(!ytModalOpen)}
          className="bg-black"
        >
          動画表示
        </button>
      </div> */}

      <div id="container">
        {ingModalOpen && (
          <ModalContainer>
            <IngModal
              modalClose={() => {
                setIngModalOpen(false);
              }}
            />
          </ModalContainer>
        )}
        {ytModalOpen && (
          <ModalContainer>
            <YtModal
              modalClose={() => {
                setYtModalOpen(false);
              }}
              keyword={keyword}
            />
          </ModalContainer>
        )}
        {guideModalOpen && (
          <ModalContainer>
            <GuideModal
              modalClose={() => {
                setGuideModalOpen(false);
              }}
            />
          </ModalContainer>
        )}
        {timerModalOpen && (
          <ModalContainer>
            <TimerModal
              modalClose={() => {
                setTimerStart(false)
                setTimerModalOpen(false);
              }}
              str={str}
              start={timerStart}
              setStart={setTimerStart}
            />
          </ModalContainer>
        )}
      </div>
      <button className="bg-black" onClick={()=>setTimerModalOpen(true)}>タイマー</button>
      <div className="text-white flex justify-between fixed bottom-0 z-10 w-full h-14">
        <button
          onClick={() => (id == 0 ? setId(id) : setId(id - 1))}
          className="w-20 h-14 bg-transparent font-bold"
        >
          <FaArrowLeft className="w-6 h-6 mx-7" />
          前へ
        </button>
        <div className="w-full flex justify-between">
          <button
            onClick={() => setIngModalOpen(!ingModalOpen)}
            className="bg-transparent font-bold"
          >
            <PiNoteDuotone className="w-6 h-6 mx-7" />
            材料
          </button>
          <button
            onClick={() => setGuideModalOpen(!guideModalOpen)}
            className="bg-transparent font-bold"
          >
            <IoChatbubbleEllipsesOutline className="w-6 h-6 mx-7" />
            ガイド
          </button>
        </div>
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
