"use client";

import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

const Speech = () => {
  const [message, setMessage] = useState("");
  const [lastTranscript, setLastTranscript] = useState(""); // 最後に処理したtranscript

  const commands = [
    {
      command: "次へ",
      callback: () => {
        setMessage("進みます");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "前へ",
      callback: () => {
        setMessage("戻ります");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "材料表示",
      callback: () => {
        setMessage("材料を表示します");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマー スタート",
      callback: () => {
        setMessage("タイマーをスタート");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマー ストップ",
      callback: () => {
        setMessage("タイマーをストップ");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマー リセット",
      callback: () => {
        setMessage("タイマーをリセット");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*の量は",
      callback: (material: string) => {
        setMessage(`${material}の量はこの通りです`);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*ってどうやる",
      callback: (material: string) => {
        setMessage(`${material}はこのような切り方です`);
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
      if (message === "") {
        SpeechRecognition.startListening({ continuous: true });
      }
      setLastTranscript(transcript);
    }
  }, [transcript, lastTranscript, message]);

  // 音声認識が停止したときに再スタートする処理
  // 認識停止予防
  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <p>response : {message}</p>
      <p>input : {transcript}</p>
      {/* <p>入力: {listening ? "on" : "off"}</p>
        <button type="button" onClick={() => SpeechRecognition.startListening({ continous: true })}>
          入力開始
        </button>
        <button type="button" onClick={() => SpeechRecognition.stopListening()}>
          Stop
        </button>
        <button type="button" onClick={() => resetTranscript()}>
          リセット
        </button> */}
    </div>
  );
};

export default Speech;
