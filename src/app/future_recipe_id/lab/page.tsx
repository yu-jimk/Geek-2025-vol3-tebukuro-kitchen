"use client";

import React, { useState } from "react";
import Timer from "./Timer";

const Timerlab = () => {
  const str: string = "4時間45分4秒";
  const [disp, setDisp] = useState("");
  const [timerStart, setTimerStart] = useState(false);
  return (
    <>
      <div className="text-black">
        <Timer
          str={str}
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

export default Timerlab;
