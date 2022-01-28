import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "../PlayButton";
import PauseButton from "../PauseButton";
import SettingsButton from "../SettingsButton";
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "../SettingsContext";

const red = '#f54e4e';
const green = '#4aec8c';
// Timer 需要找到
// []
function Timer() {
  const settingsInfo = useContext(SettingsContext);
  // 计时器基本属性 是否开始
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
//
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  // 减时间 基本单位用秒计
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      // 从setting中获取用户设置的初始时间
      const nextSeconds = settingsInfo.workMinutes * 60;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      // 剩余的时间
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    },1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = secondsLeftRef * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
      <div>
        <CircularProgressbar
            value={percentage}
            text={minutes + ':' + seconds}
            styles={buildStyles({
              textColor:'#fff',
              pathColor:'#4aec8c',
              tailColor:'rgba(255,255,255,.2)',
            })} />
        <div style={{marginTop:'20px'}}>
          {isPaused
              ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
              : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
        </div>
        {/*<div style={{marginTop:'20px'}}>*/}
        {/*  <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />*/}
        {/*</div>*/}
      </div>
  );
}

export default Timer;