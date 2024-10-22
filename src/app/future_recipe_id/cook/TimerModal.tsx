import { SetStateAction, useEffect, useRef, useState } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";
import { IoMdClose } from "react-icons/io";

const TimerModal = ({
  modalClose,
  str,
  start,
  setStart,
}: {
  modalClose: () => void;
  str: string;
  start: boolean;
  setStart: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [disp, setDisp] = useState("");
  const { hour, min, sec } = str2TimerText(str);
  const h = useRef(hour);
  const m = useRef(min);
  const s = useRef(sec);

  useEffect(() => {
    const { hour, min, sec } = str2TimerText(str);
    h.current = hour;
    m.current = min;
    s.current = sec;
  }, [str]);

  useEffect(() => {
    setDisp(num2TimerText(h.current, m.current, s.current));
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        s.current--;
        if (s.current == 0 && m.current == 0 && h.current == 0) {
          clearInterval(manager);
        } else if (s.current == -1) {
          s.current = 59;
          m.current--;
          if (m.current == -1) {
            m.current = 59;
            h.current--;
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
  }, [hour, min, sec, setDisp, start]);

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
          <div className="bg-white mx-20 w-full shadow-lg text-black">
            <div className="flex w-full justify-end">
              <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
            </div>
            <div className="font-sans font-bold mx-5 mb-5 text-5xl text-center">
              {disp}
            </div>
            <button
              onClick={() => setStart(!start)}
              className="bg-black text-white"
            >
              {`start:${start}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerModal;
