/*
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
*/

import { SetStateAction, useEffect, useRef, useState } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";
import { IoMdClose } from "react-icons/io";

const TimerModal = ({
  modalClose,
  inputTime,
  start,
  setStart,
}: {
  modalClose: () => void;
  inputTime: string;
  start: boolean;
  setStart: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [disp, setDisp] = useState("");
  const { hour, min, sec } = str2TimerText(inputTime);
  const h = useRef(hour);
  const m = useRef(min);
  const s = useRef(sec);

  useEffect(() => {
    const { hour, min, sec } = str2TimerText(inputTime);
    h.current = hour;
    m.current = min;
    s.current = sec;
  }, [inputTime]);

  useEffect(() => {
    const alarm = new Audio("/TimerAlarm.mp3");
    setDisp(num2TimerText(h.current, m.current, s.current));
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
        setDisp(num2TimerText(h.current, m.current, s.current));
      }, 1000);
    }
    return () => {
      if (manager) {
        clearInterval(manager);
      }
    };
  }, [hour, min, sec, setDisp, start, setStart]);

  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0">
        <div
          onClick={bgClickClose}
          className="flex justify-center items-center h-full"
        >
          <div className="bg-white mx-20 w-full shadow-lg text-black rounded-3xl">
            <div className="flex w-full justify-end">
              <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
            </div>
            <div className="font-sans font-bold mx-5 mb-5 text-5xl text-center">
              {disp}
              <div className="text-sm">　　　時間　　　　分　　　　秒</div>
            </div>
            <div className="w-full flex justify-between font-bold">
              <button
                onClick={() => h.current++}
                className="bg-orange-400 text-white ml-5 mr-0 mb-7 mt-3 rounded-full px-4"
              >
                時間
              </button>
              <button
                onClick={() => m.current++}
                className="bg-orange-400 text-white mx-0 mb-7 mt-3 rounded-full px-4"
              >
                分
              </button>
              <button
                onClick={() => s.current++}
                className="bg-orange-400 text-white mx-0 mb-7 mt-3 rounded-full px-4"
              >
                秒
              </button>
              <button
                onClick={() => setStart(!start)}
                className="bg-orange-400 text-white mx-5 mb-5 rounded-full p-4"
              >
                スタート
                <br />
                ストップ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerModal;
