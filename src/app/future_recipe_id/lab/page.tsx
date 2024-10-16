import React from "react";

type unit = {
  [key: string]: number;
};

const parseTime2sec = (time: string): number => {
  //                      優先度 高->低
  const regex = /(\d+)\s*(秒|分半|分|時間半|時間|日)/g;
  let match: RegExpExecArray | null;
  let miliSec: number = 0;

  const unitToMs: unit = {
    日: 86400000,
    時間半: 3600000,
    時間: 3600000,
    分半: 60000,
    分: 60000,
    秒: 1000,
  };

  while ((match = regex.exec(time)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    if (unitToMs[unit]) {
      miliSec += value * unitToMs[unit];
      if (unit == "分半" || unit == "時間半") {
        miliSec += unitToMs[unit] / 2;
      }
    }
  }

  return miliSec / 1000;
};

const Timer = ({ time }: { time: string }) => {
  let sec: number = parseTime2sec(time);
  let min, hour;
  hour = Math.floor(sec/3600);
  sec -= hour*3600;
  min = Math.floor(sec / 60);
  sec -= min * 60;
  return <div>{`${hour}:${min}:${sec}`}</div>;
};

const page = () => {
  return (
    <>
      <div className="text-black">
        <Timer time="4分20秒" />
      </div>
    </>
  );
};

export default page;
