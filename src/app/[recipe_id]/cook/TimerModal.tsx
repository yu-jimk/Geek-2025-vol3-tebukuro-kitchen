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
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const alarm = useRef<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    alarm.current = new Audio("/TimerAlarm.mp3");
  }, [alarm]);

  // 音声入力された時のみ変換して初期化
  useEffect(() => {
    if (inputTime != "") {
      const { m, s } = str2TimerText(inputTime);
      setMin(m);
      setSec(s);
      setInUse(true);
      setUpdate(!update);
      setInputTime(""); //一旦毎回リセットするようにする
    }
  }, [inputTime, setInputTime, setInUse, update]);

  // タイマー更新関数
  useEffect(() => {
    setTimerDisp(num2TimerText(min, sec, setMin, setSec, true));
    if (min == 0 && sec == 0) {
      setInUse(false);
    } else {
      setInUse(true);
    }
  }, [update, setTimerDisp, setInUse]);

  // アラーム終了時の処理
  if (alarm.current) {
    alarm.current.onended = () => {
      setStart(false);
      reset();
    };
  }

  useEffect(() => {
    setTimerDisp(num2TimerText(min, sec, setMin, setSec, false));
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        if (sec <= 0 && min == 0) {
          clearInterval(manager);
          if (alarm.current) {
            alarm.current.play();
            setPlaying(true);
          }
        } else {
          setSec(sec - 1);
          if (sec == 0) {
            setSec(59);
            setMin(min - 1);
          }
        }
        setTimerDisp(num2TimerText(min, sec, setMin, setSec, false));
      }, 1000);
    }
    return () => {
      if (manager) {
        clearInterval(manager);
      }
    };
  }, [setTimerDisp, start, setStart, min, sec]);

  const reset = () => {
    if (alarm.current) {
      alarm.current.pause();
      alarm.current.currentTime = 0;
      setPlaying(false)
    }
    setMin(0);
    setSec(0);
    setStart(false);
    setUpdate(!update);
  };

  const start_stop = () => {
    if (min !== 0 || sec !== 0) setStart(!start);
    else reset();
  };

  useEffect(() => {
    if (playing && (min == 0 || sec == 0)) reset();
  }, [start]);

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
              <div className="flex w-full justify-end mb-3">
                <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
              </div>
              <div className="font-sans font-bold mx-5 mb-5 text-8xl text-center">
                {timerDisp}
              </div>
              <div className="w-full font-bold mb-2">
                <div className="flex justify-between mx-5 mb-5 leading-none">
                  <button
                    onClick={() => {
                      setMin(min + 10);
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +10分
                  </button>
                  <button
                    onClick={() => {
                      setMin(min + 5);
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +5分
                  </button>
                  <button
                    onClick={() => {
                      setMin(min + 1);
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +1分
                  </button>
                  <button
                    onClick={() => {
                      setSec(sec + 10);
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +10秒
                  </button>
                </div>
                <div className="flex justify-between mx-5 mb-5">
                  <button
                    onClick={() => start_stop()}
                    className="text-2xl tracking-tighter leading-none bg-orange-400 text-white rounded-full w-40 h-20 mr-5"
                  >
                    {start ? "ストップ" : "スタート"}
                  </button>
                  <button
                    onClick={() => reset()}
                    className="text-2xl tracking-tighter bg-orange-100 text-orange-400 rounded-full w-40 h-20"
                  >
                    リセット
                  </button>
                </div>
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
        <span></span>
      )}
    </>
  );
};

export default TimerModal;
