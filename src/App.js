import React, { useState, useRef, useEffect, useCallback } from "react";

const App = () => {
  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:00");
  const [inputTime, setInputTime] = useState(10);
  const [endTime, setEndTime] = useState(null);

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = useCallback((endTime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      setTimer("00:00:00");
      clearInterval(Ref.current);
    }
  }, []);

  const clearTimer = useCallback(
    (endTime) => {
      setTimer("00:00:00");

      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(endTime);
      }, 1000);
      Ref.current = id;
    },
    [startTimer]
  );

  const handleStart = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + parseInt(inputTime, 10));
    setEndTime(deadline);
    clearTimer(deadline);
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h1 style={{ color: "green" }}>YuHan</h1>
      <h3>Countdown Timer Using React JS</h3>
      <h2>{timer}</h2>
      <input
        type="number"
        value={inputTime}
        onChange={handleInputChange}
        placeholder="Please input the countdown time(s)"
        style={{ marginRight: "10px", padding: "5px", fontSize: "16px" }}
      />
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default App;
