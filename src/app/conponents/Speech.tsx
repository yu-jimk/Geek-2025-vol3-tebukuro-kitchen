"use client";

import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

type screenController = {
  next: (
    num: number,
    length: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  back: (
    num: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => void;
};

const Speech = ({
  next,
  back,
  num,
  length,
  setPage,
  setIngModalOpen,
  setYtModalOpen,
  setKeyword,
  setGuideModalOpen,
  setTimerModalOpen,
  setInputTime,
  setTimerStart,
}: {
  next: screenController["next"];
  back: screenController["back"];
  num: number;
  length: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIngModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setYtModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setGuideModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInputTime: React.Dispatch<React.SetStateAction<string>>;
  setTimerStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState("");

  const commands = [
    {
      command: /.*(進んで|進む|次へ|次).*/,
      //　*印は、雑音に影響されないよう命令の前後の文言を許容するため。起こる恐れのあるバグが不明のため、要検証
      callback: () => {
        next(num, length, setPage);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: /.*(戻って|戻る|前へ|前).*/,
      callback: () => {
        back(num, setPage);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*材料は*",
      callback: () => {
        setIngModalOpen(true);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*閉じて*",
      callback: () => {
        setIngModalOpen(false);
        setYtModalOpen(false);
        setGuideModalOpen(false);
        setTimerStart(false);
        setTimerModalOpen(false);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*スタート*",
      callback: () => {
        setTimerStart(true);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*ストップ*",
      callback: () => {
        setTimerStart(false);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: /.*タイマー(.*)セット.*/,
      callback: (material: string) => {
        console.log(material)
        setInputTime(material.replace(/\s+/g, "")); //スペース削除
        setResponse(material.replace(/\s+/g, ""));
        setTimerModalOpen(true);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: /(.*)ってどうするの.*/,
      callback: (material: string) => {
        setKeyword(material);
        setYtModalOpen(true);
        setResponse(`${material}`);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*ガイド*",
      callback: () => {
        setGuideModalOpen(true);
        setResponse(`guide`);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  // ここの処理はなくても良さそう。認識が止まることがあれば戻す。
  // const [lastTranscript, setLastTranscript] = useState(""); // 最後に処理したtranscript
  // useEffect(() => {
  //   if (transcript && transcript !== lastTranscript) {
  //     // コマンドで処理されなかった場合の処理
  //     // 認識停止予防
  //     if (response === "") {
  //       SpeechRecognition.startListening({ continuous: true });
  //     }
  //     setLastTranscript(transcript);
  //   }
  // }, [transcript, lastTranscript, response]);

  // 音声認識が停止したときに再スタートする処理
  // 認識停止予防
  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  useEffect(() => {
    console.log("[input] " + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    console.log("Speech conponent ERROR");
  }

  return (
    <>
      {/* <p className="text-black fixed top-32 bg-black bg-opacity-20">
        response : {response}
      </p> */}
      <div className="w-full flex justify-end items-center font-mono">
        <span className="z-10 flex overflow-hidden justify-end whitespace-nowrap w-[50vw] h-6 mb-14 text-white fixed bottom-0 bg-black bg-opacity-30">
          {transcript}
        </span>
      </div>
    </>
  );
};

export default Speech;
