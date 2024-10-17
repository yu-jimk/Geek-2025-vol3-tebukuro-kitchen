"use client";

import React, { useState } from "react";
import Timer from "./Timer";
import { str2TimerText } from "./timerFunc";

const page = () => {
  let str: string = "4時間45分4秒";
  const { timerText, hour, min, sec } = str2TimerText(str);
  const [h, setHour] = useState(hour);
  const [m, setMin] = useState(min);
  const [s, setSec] = useState(sec);
  const [disp, setDisp] = useState(timerText);
  const [timerStart, setTimerStart] = useState(false);
  return (
    <>
      <div className="text-black">
        <Timer
          hour={h}
          min={m}
          sec={s}
          setHour={setHour}
          setMin={setMin}
          setSec={setSec}
          start={timerStart}
          disp={disp}
          setDisp={setDisp}
        />
        <button
          className="bg-gray-400"
          onClick={() => setTimerStart(!timerStart)}
        >
          {`start: ${timerStart}`}
        </button>
      </div>
    </>
  );
};

export default page;
