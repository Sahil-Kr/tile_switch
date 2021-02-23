import "./App.css";
import Tiles from "./components/Tiles";
import Timer from "./components/Timer";
import React, { useState } from "react";

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState("");

  const gameToggle = () => {
    setGameOn((gameOn) => !gameOn);
  };

  const time = (sec) => {
    const seconds = sec % 60;
    const mins = Math.floor(sec / 60) % 60;
    const hours = Math.floor(sec / 3600) % 24;

    return `${hours.toString().padStart(2, 0)}:${mins
      .toString()
      .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  };

  return (
    <div className="App">
      <h2>TILE SWITCH</h2>
      <Timer gameOn={gameOn} setScore={setScore} />
      <button onClick={gameToggle}>{gameOn ? "RESET" : "START"}</button>
      <Tiles
        handleGameOn={gameToggle}
        gameOn={gameOn}
        setGameWon={setGameWon}
      />
      {/* <div className="Score">Last Time : {time(score)}</div> */}
      {gameWon ? (
        <div className="Dialog">
          <div className="Close" onClick={() => setGameWon(false)}>
            X
          </div>
          <h1>Congratualtions!</h1>
          <p>Total time taken</p>
          <p>{time(score)}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
