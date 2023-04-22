import React, { useState, useEffect, useRef } from "react";
import "./Countdown.css";

function TimeCountdown(props) {
  return (
    <div className="time">
      <div>
        <p className="hours">{props.hours}</p>
        <p className="timeName">HOUR</p>
      </div>
      <p className="colon">:</p>
      <div>
        <p className="minutes">{props.minutes}</p>
        <p className="timeName">MINUTE</p>
      </div>
      <p className="colon">:</p>
      <div>
        <p className="seconds">{props.seconds}</p>
        <p className="timeName">SECOND</p>
      </div>
    </div>
  );
}

function Countdown() {
  const [hours, setHours] = useState("--");
  const [minutes, setMinutes] = useState("--");
  const [seconds, setSeconds] = useState("--");
  const [isMute, setIsMute] = useState(true);
  const videoRef = useRef(null);

  function updateTimes(countDownDate) {
    let now = Date.now();
    let distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(interval);
      setMessage("开服啦!");
      return;
    }
    let hours = Math.floor(distance / (1000 * 60 * 60));
    setHours(hours.toString().padStart(2, "0"));

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    setMinutes(minutes.toString().padStart(2, "0"));

    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setSeconds(seconds.toString().padStart(2, "0"));
  }

  useEffect(() => {
    let countDownDate = new Date("2023-04-26T10:00:00+08:00").getTime();
    // 先执行一次
    updateTimes(countDownDate);
    // 每秒更新一次
    let interval = setInterval(() => {
      updateTimes(countDownDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <video loop ref={videoRef} className="video" src="starrail.mp4"></video>
      {isMute ? (
        <span
          className="muteBtn"
          onClick={() => {
            videoRef.current.muted = false;
            videoRef.current.play();
            setIsMute(false);
          }}
        >
          ▶︎
        </span>
      ) : (
        <div className="countdown">
          <TimeCountdown hours={hours} minutes={minutes} seconds={seconds} />
          <TimeCountdown hours={hours} minutes={minutes} seconds={seconds} />
          <p className="message">COMING SOON</p>
        </div>
      )}
    </>
  );
}

export default Countdown;
