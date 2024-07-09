import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:00");
  const [inputTime, setInputTime] = useState(10);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
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

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("00:00:10");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + inputTime);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h1 style={{ color: "green" }}>GeeksforGeeks</h1>
      <h3>Countdown Timer Using React JS</h3>
      <h2>{timer}</h2>
      <input
        type="number"
        value={inputTime}
        onChange={handleInputChange}
        placeholder="输入倒计时时间（秒）"
        style={{ marginRight: "10px", padding: "5px", fontSize: "16px" }}
      />
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
};

export default App;
