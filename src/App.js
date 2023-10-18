import { useEffect, useState } from "react";
import React from "react";
import audioFile from "./Cymatics - Odyssey Synth One Shot 13 - F.wav";

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

function Board() {
  const audioRef = React.useRef(null);
  const [playaudio, setAudio] = useState(false);
  const [state, setState] = useState(Array(9).fill(null));
  const [current, setCurrent] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
    if (playaudio) {
      audioRef.current.play();
      setAudio(false);
    }
  }, [playaudio]);

  function checkWinner() {
    const WinningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];

    for (const winner of WinningCombinations) {
      const [a, b, c] = winner;
      if (state[a] === state[b] && state[a] === state[c] && state[a] !== null)
        return `${state[a]} won the game`;
    }

    if (state.every((cell) => cell !== null)) {
      return "It's a draw";
    }
  }
  const isWinner = checkWinner();

  function handleClick(index) {
    checkWinner();
    const clicked = [...state];
    if (state[index] === null) {
      clicked[index] = current ? "X" : "O";
      clicked[index] === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
      setState(clicked);
      setCurrent(!current);
      setAudio(true);
    }
  }

  //* Resest and score update
  function reset() {
    setState(Array(9).fill(null));
    setCurrent("X");

    const winner = checkWinner();
    const W = winner.split(" ")[0];
    console.log(W);
    if (W === "X") {
      setXWins(xWins + 1);
    } else if (winner === "O") {
      setOWins(oWins + 1);
    }
    if (W === "O") {
      setOWins(oWins + 1);
    }
  }

  return (
    <div className="board">
      <audio
        className="Aud"
        src={audioFile}
        type="audio/wav"
        controls
        ref={audioRef}
        onEnded={() => setAudio(false)}
      ></audio>

      <div className="Winner-stats">
        <div className="win">X Total wins : {xWins}</div>
        <div className="win">O Total wins : {oWins}</div>
      </div>

      {isWinner ? (
        <>
          <p className="Winner">{isWinner}</p>
          <button onClick={reset}>Play Again</button>
        </>
      ) : (
        <>
          <Player className="current--player">
            {currentPlayer && <p>Make your move : {currentPlayer}</p>}
          </Player>
          <div className="board-row">
            <Square Onclick={() => handleClick(0)} value={state[0]} />
            <Square Onclick={() => handleClick(1)} value={state[1]} />
            <Square Onclick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square Onclick={() => handleClick(3)} value={state[3]} />
            <Square Onclick={() => handleClick(4)} value={state[4]} />
            <Square Onclick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square Onclick={() => handleClick(6)} value={state[6]} />
            <Square Onclick={() => handleClick(7)} value={state[7]} />
            <Square Onclick={() => handleClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
}

function Square({ Onclick, value }) {
  return (
    <div onClick={Onclick} className="square">
      <h5 className="text">{value}</h5>
    </div>
  );
}

function Player({ children, className }) {
  return <div className={className}>{children}</div>;
}

export default App;
