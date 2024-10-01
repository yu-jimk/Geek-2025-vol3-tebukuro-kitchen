"use client";

import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

type screenController = {
  next: (
    num: number,
    page: number,
    setId: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  back: (
    num: number,
    setId: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  dispModal: (
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    status: boolean
  ) => void;
};

const Speech = ({
  next,
  back,
  dispModal,
  num,
  page,
  setId,
  setModalOpen,
}: {
  next: screenController["next"];
  back: screenController["back"];
  dispModal: screenController["dispModal"];
  num: number;
  page: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState("");
  const [lastTranscript, setLastTranscript] = useState(""); // 最後に処理したtranscript

  const commands = [
    {
      command: "*進んで*",
      //　*印は、雑音に影響されないよう命令の前後の文言を許容するため。起こる恐れのあるバグが不明のため、要検証
      callback: () => {
        next(num, page, setId);
        setResponse("next")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*戻って*",
      callback: () => {
        back(num, setId);
        setResponse("back")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*材料は*",
      callback: () => {
        dispModal(setModalOpen, true);
        setResponse("dispModal")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*閉じて*",
      callback: () => {
        dispModal(setModalOpen, false);
        setResponse("closeModal")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマーをスタート",
      callback: () => {
        setResponse("start")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマーをストップ",
      callback: () => {
        setResponse("stop")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマーをリセット",
      callback: () => {
        setResponse("reset")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*の量は",
      callback: () => {
        setResponse("amouht")
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*ってどうやる",
      callback: () => {
        setResponse("how")
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

  useEffect(() => {
    if (transcript && transcript !== lastTranscript) {
      // コマンドで処理されなかった場合の処理
      // 認識停止予防
      if (response === "") {
        SpeechRecognition.startListening({ continuous: true });
      }
      setLastTranscript(transcript);
    }
  }, [transcript, lastTranscript, response]);

  // 音声認識が停止したときに再スタートする処理
  // 認識停止予防
  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    console.log("Speech conponent ERROR");
  }

  useEffect(() => {
    console.log("Current response:", response);
  }, [response]);

  return (
    <>
      {/* デバッグ用 */}
      <p className="text-black">input : {transcript}</p>
      <p className="text-black">response : {response}</p>
    </>
  );
};

export default Speech;
