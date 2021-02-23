import React, { useEffect, useState } from "react";
import classes from "./index.module.css";

const Timer = ({ gameOn, setScore }) => {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec((sec) => sec + 1);
    }, 1000);

    if (!gameOn) {
      setSec(0);
      clearInterval(timer);
    } else {
      setScore(sec);
    }

    return () => {
      clearInterval(timer);
    };
  }, [sec, gameOn, setScore]);

  const time = () => {
    const seconds = sec % 60;
    const mins = Math.floor(sec / 60) % 60;
    const hours = Math.floor(sec / 3600) % 24;

    return `${hours.toString().padStart(2, 0)}:${mins
      .toString()
      .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  };

  return <div className={classes.Time}>{time()}</div>;
};

export default Timer;
