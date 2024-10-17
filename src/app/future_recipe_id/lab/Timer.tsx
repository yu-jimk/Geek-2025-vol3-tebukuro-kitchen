import { useEffect, useState } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";

const Timer = ({
  hour,
  min,
  sec,
  setHour,
  setMin,
  setSec,
  start,
  disp,
  setDisp,
}: {
  hour:number;
  min:number;
  sec:number;
  setHour:React.Dispatch<React.SetStateAction<number>>;
  setMin:React.Dispatch<React.SetStateAction<number>>;
  setSec:React.Dispatch<React.SetStateAction<number>>;
  start: boolean;
  disp: string;
  setDisp: React.Dispatch<React.SetStateAction<string>>;
}) => {

  useEffect(() => {
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        setSec(sec-1)
        if (sec == -1) {
          setSec(59);
          setMin(min-1);
          if (min == -1) {
            setMin(59);
            setHour(hour-1);
          }
        }
        setDisp(num2TimerText(hour, min, sec));
        console.log(hour,min,sec)
      }, 1000);
    }
    return () => {
      if (manager) {
        clearInterval(manager);
      }
    };
  }, [start]);

  return <div>{disp}</div>;
};

export default Timer;
