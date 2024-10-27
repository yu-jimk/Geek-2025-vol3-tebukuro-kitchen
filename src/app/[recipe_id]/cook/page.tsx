"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Speech from "@/app/conponents/Speech";
import IngModal from "../../future_recipe_id/cook/IngModal";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { PiNoteDuotone } from "react-icons/pi";
import { IoChatbubbleEllipsesOutline, IoMicOutline } from "react-icons/io5";
import { FiCameraOff } from "react-icons/fi";
import { createPortal } from "react-dom";
import {
  getByDescriptId,
  getByIngredientId,
  getRecipesbyId,
} from "@/app/utils/supabaseFunctions";
import { Descript, Ingredient } from "@/app/types";
import YtModal from "../../future_recipe_id/cook/YtModal";
import GuideModal from "../../future_recipe_id/cook/GuideModal";
import TimerModal from "../../future_recipe_id/cook/TimerModal";
import RecipeHeader from "@/app/conponents/RecipeHeader";

//丸を描画する関数　length=丸の数　id=塗りつぶし判定用ページ数
const Circle = ({ length, page }: { length: number; page: number }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className={`mx-2 w-2 h-2 border border-black rounded-full ${
            page == index ? "bg-orange-400" : ""
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

const Cook = ({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
}) => {
  const [title, setTitle] = useState<string>('')
  const [descript, setDescript] = useState<Descript[]>([]);
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);
  useEffect(() => {
    const getRecipes = async () => {
      const rec = await getRecipesbyId(params.recipe_id)
      const desc = await getByDescriptId(params.recipe_id);
      const ing = await getByIngredientId(params.recipe_id);
      setTitle(rec[0].name)
      setDescript(desc);
      setIngredient(ing);
    };
    getRecipes();
  }, [params.recipe_id]);
  const length = descript.length;

  // useEffect(() => {
  //   const sorted = recipes.sort((a: Descript, b: Descript) => a.id - b.id);
  //   setRecipes(sorted);
  // }, []);

  const [page, setPage] = useState(0); //現在のページ
  const [ingModalOpen, setIngModalOpen] = useState(false);
  const [ytModalOpen, setYtModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [str, setStr] = useState("");
  const [timerStart, setTimerStart] = useState(false);

  const back = (
    num: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    num == 0 ? setPage(num) : setPage(num - 1);
  };
  const next = (
    num: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    num == page - 1 ? setPage(num) : setPage(num + 1);
  };
  const from = searchParams?.from;
  return (
    <>
      <body className="bg-white">
        <RecipeHeader
          bgColor="bg-orange-400"
          textColor="text-white"
          title={title}
          link={
            from === "favorites"
              ? `/${params.recipe_id}?from=favorites`
              : `/${params.recipe_id}`
          }
          iconFill="white"
        />
        <Speech
          next={next}
          back={back}
          num={page}
          length={length}
          setPage={setPage}
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
          {/* {descript[id].image_url ? (
          <Image
            src={descript[id]?.image_url ?? ""}
            sizes="100vw"
            fill
            className="object-cover"
            onError={() => console.error("Image failed to load")}
          />
        ) : (
          <FiCameraOff size={40} stroke="#737373" />
        )} */}
        </div>
        <div className="mt-6 mb-10 flex justify-center">
          <Circle length={length} page={page} />
        </div>
        <div
          id="desc"
          className="mx-5 font-mono font-black text-left text-black text-2xl break-words"
        >
          {descript[page]?.text ?? "読み込み中・・・"}
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
                  setTimerStart(false);
                  setTimerModalOpen(false);
                }}
                str={str}
                start={timerStart}
                setStart={setTimerStart}
              />
            </ModalContainer>
          )}
        </div>
        <button className="bg-black" onClick={() => setTimerModalOpen(true)}>
          タイマー
        </button>
        <div className="text-white flex justify-between fixed bottom-0 z-10 w-full h-14">
          <button
            onClick={() => (page == 0 ? setPage(page) : setPage(page - 1))}
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
            onClick={() => (page == length - 1 ? setPage(page) : setPage(page + 1))}
            className="w-20 h-14 bg-transparent font-bold"
          >
            <FaArrowRight className="w-6 h-6 mx-7" />
            次へ
          </button>
        </div>
        <div className="bg-orange-400 w-full fixed bottom-0 h-14 flex justify-center">
          <div className="absolute -top-10 bg-orange-400 w-24 h-24 rounded-full flex justify-center">
            <IoMicOutline className="relative w-12 h-12 top-6" />
          </div>
        </div>
      </body>
    </>
  );
};

export default Cook;
