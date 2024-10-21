//Imports useState function from React that will remember the current value
//of Square, and then change it each time it is clicked.
import { useState } from "react";
//Value and onSquareClick considered a prop, which passes along a specified output or function
//Value will be an array, as defined by the Board component.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Main function of file, available outside of file.
//Creates component Board, using Square component to return buttons.
//Components must be capitalized unlike class names
//State private only to this component
function Board({ xIsNext, squares, onPlay }) {
  //Slice coping squares will allow for going back to previous steps.
  //Function slice copies above array, then nextSquares updates array to add X to it,
  //and then setSquares tells React that component has changed, thus adding an X to the screen.
  //i is passed in order to determine the index (0-8) of the square to add an X to when clicked.
  const wabbit = require("/src/wabbit.svg");
  const duck = require("/src/duck.svg");
  function handleClick(i) {
    //Purpose is to check if the square already has a X or O in it.
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = <img src={wabbit} />;
    } else {
      nextSquares[i] = <img src={duck} />;
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "FIRE!";
  } else {
    status = xIsNext ? "Wabbit Season!" : "Duck Season!";
  }

  return (
    //Fragments - allows each button to be separately returned to browser
    //Passses the onSquareClick prop down to the Board function via component-defined function handleClick
    //onSquareClick now defines each square as index between 0-8. handleClick will then add X or O to board.
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
      return null;
    }
  }
}
export default function Game() {
  //Sets up the board so that each square is initially setup to be null or blank
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
