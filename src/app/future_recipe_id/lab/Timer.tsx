import { useEffect, useRef } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";

const Timer = ({
  str,
  start,
  disp,
  setDisp,
}: {
  str: string;
  start: boolean;
  disp: string;
  setDisp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { hour, min, sec } = str2TimerText(str);
  const h = useRef(hour);
  const m = useRef(min);
  const s = useRef(sec);

  useEffect(() => {
    setDisp(num2TimerText(h.current, m.current, s.current));
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        s.current--;
        if (s.current == -1) {
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

  return <div>{disp}</div>;
};

export default Timer;
