import React, { useEffect } from "react";

export const SetIntervalTimerDemo: React.FC = () => {
  const [timer, setTimer] = React.useState(10);
  const [timerAction, setTimerAction] = React.useState(false);
  //Add a button to start timer
  //the timer should start from 10 seconds and go to 1
  //the timer should be displayed in a <p> tag
  //the button should be disabled when timer is running
  useEffect(() => {
    const timerFunction = setInterval(() => {
      //Decrease the timer every 1 sec
      setTimer(timer - 1);
    }, 1000);
    if (timer <= 1) {
      clearInterval(timerFunction);
    }
  }, []);
  return (
    <div>
      <p>{timer}</p>
      <button>{timerAction === true ? "Stop" : "Start"}</button>
    </div>
  );
};

