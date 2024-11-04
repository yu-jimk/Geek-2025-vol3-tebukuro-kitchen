/*
  TODO
  inputTime = 音声で入力された時間（５分半とか）
  音声認識で表示させる場合はこれを使って時間を設定する。
  そうでない場合、つまり手で直接時間を入力する場合は、
  inputTimeが空の時なので、条件分岐して別途方法を作る。（今のところは既存のモーダルを活用する予定）
  
  理想
    もし　音声認識で時間が入力されたなら、
      inputTimeを時間に変換しh,m,sに代入、タイマーを設定して左下に小さく表示
    でなければ
      時間設定用のモーダルを表示、内容をh,m,sに代入
      スタートボタンを押したら、左下に小さく表示する。押される前に閉じられたら、何もせず入力をリセットする
  
  共通事項
    左下に小さく表示されたタイマーは、タップするとモーダルが表示される。

  数字をボタンではなくiphoneのアラームみたいにスライドで設定できるようにしたい（優先度は低め）
*/

import { SetStateAction, useEffect, useRef, useState } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";
import { IoMdClose } from "react-icons/io";

const TimerModal = ({
  timerModalOpen,
  setTimerModalOpen,
  modalClose,
  inputTime,
  setInputTime,
  start,
  setStart,
  timerDisp,
  setTimerDisp,
}: {
  timerModalOpen: boolean;
  setTimerModalOpen: React.Dispatch<SetStateAction<boolean>>;
  modalClose: () => void;
  inputTime: string;
  setInputTime: React.Dispatch<SetStateAction<string>>;
  start: boolean;
  setStart: React.Dispatch<SetStateAction<boolean>>;
  timerDisp: string;
  setTimerDisp: React.Dispatch<SetStateAction<string>>;
}) => {
  const [inUse, setInUse] = useState(false); // タイマーの使用中判定（左下表示判定用）
  const [update, setUpdate] = useState(false); // 値更新検出用
  const h = useRef(0);
  const m = useRef(0);
  const s = useRef(0);

  // 音声入力された時のみ変換して初期化
  useEffect(() => {
    if (inputTime != "") {
      const { hour, min, sec } = str2TimerText(inputTime);
      h.current = hour;
      m.current = min;
      s.current = sec;
      setInUse(true);
      setUpdate(!update);
      setInputTime(""); //一旦毎回リセットするようにする
    }
  }, [inputTime, setInputTime, setInUse, update]);

  useEffect(() => {
    setTimerDisp(num2TimerText(h.current, m.current, s.current));
    if (h.current == 0 && m.current == 0 && s.current == 0) {
      setInUse(false);
    } else {
      setInUse(true);
    }
  }, [update, setTimerDisp, setInUse]);

  useEffect(() => {
    const alarm = new Audio("/TimerAlarm.mp3");
    setTimerDisp(num2TimerText(h.current, m.current, s.current));
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        if (s.current <= 0 && m.current == 0 && h.current == 0) {
          clearInterval(manager);
          setStart(false);
          alarm.play();
        } else {
          s.current--;
          if (s.current == -1) {
            s.current = 59;
            m.current--;
            if (m.current == -1) {
              m.current = 59;
              h.current--;
            }
          }
        }
        setTimerDisp(num2TimerText(h.current, m.current, s.current));
      }, 1000);
    }
    return () => {
      if (manager) {
        clearInterval(manager);
      }
    };
  }, [setTimerDisp, start, setStart]);

  const reset = () => {
    h.current = 0;
    m.current = 0;
    s.current = 0;
    setStart(false);
    setUpdate(!update);
  };
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <>
      <div className={timerModalOpen ? "block" : "hidden"}>
        <div className="bg-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0">
          <div
            onClick={bgClickClose}
            className="flex justify-center items-center h-full"
          >
            <div className="bg-white mx-20 w-full shadow-lg text-black rounded-3xl">
              <div className="flex w-full justify-between mb-3">
                <button
                  onClick={() => reset()}
                  className="bg-orange-400 text-white text-sm tracking-tighter ml-2 rounded-full px-2 w-20 mt-2 font-bold"
                >
                  リセット
                </button>
                <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
              </div>
              <div className="font-sans font-bold mx-5 mb-5 text-5xl text-center">
                {timerDisp}
                <div className="text-sm">　　　時間　　　　分　　　　秒</div>
              </div>
              <div className="w-full flex justify-between font-bold mb-2">
                <button
                  onClick={() => {
                    h.current++;
                    setUpdate(!update);
                    if (start) setStart(false);
                  }}
                  className="bg-orange-400 text-white ml-5 rounded-full px-2 w-16 h-16 mt-2"
                >
                  時間
                </button>
                <button
                  onClick={() => {
                    m.current++;
                    setUpdate(!update);
                    if (start) setStart(false);
                  }}
                  className="bg-orange-400 text-white rounded-full px-2 mx-3 w-16 h-16 mt-2"
                >
                  分
                </button>
                <button
                  onClick={() => {
                    s.current++;
                    setUpdate(!update);
                    if (start) setStart(false);
                  }}
                  className="bg-orange-400 text-white rounded-full px-2 w-16 h-16 mt-2 mr-5"
                >
                  秒
                </button>
                <button
                  onClick={() => setStart(!start)}
                  className="text-sm tracking-tighter leading-none bg-orange-400 text-white mx-5 rounded-full px-2 py-2 w-24 h-20"
                >
                  {start ? "ストップ" : "スタート"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {inUse ? (
        <div
          onClick={() => setTimerModalOpen(true)}
          className="text-3xl w-36 fixed bottom-24 timer:bottom-16 bg-orange-100 text-black text-center rounded-full p-1 ml-2 shadow-lg"
        >
          {timerDisp}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default TimerModal;
