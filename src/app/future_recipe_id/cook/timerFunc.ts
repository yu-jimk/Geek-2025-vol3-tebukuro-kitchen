type unit = {
  [key: string]: number;
};

export const parseStr2sec = (str: string): number => {
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

  while ((match = regex.exec(str)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    console.log(value)
    if (unitToMs[unit]) {
      miliSec += value * unitToMs[unit];
      if (unit == "分半"||"時間半") {
        miliSec += unitToMs[unit] / 2;
      }
    }
  }

  return Math.trunc(miliSec / 1000); //小数点以下切り捨て
};

export const num2TimerText = (hour: number, min: number, sec: number) => {
  let timerText: string = "";
  if (hour < 10) timerText += `0${hour}:`;
  else timerText += `${hour}:`;
  if (min < 10) timerText += `0${min}:`;
  else timerText += `${min}:`;
  if (sec < 10) timerText += `0${sec}`;
  else timerText += `${sec}`;
  return timerText;
};

export const str2TimerText = (str: string) => {
  let sec: number = parseStr2sec(str);
  let min: number;
  let hour: number;
  hour = Math.floor(sec / 3600);
  sec -= hour * 3600;
  min = Math.floor(sec / 60);
  sec -= min * 60;

  return { hour, min, sec };
};