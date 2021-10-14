import React, { useReducer } from "react";
import Board from "./Board";

const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE":
      return {
        ...state,
        history: state.history.concat({ squares: action.payload.squares }),
        square: action.payload.squares,
        xIsNext: !state.xIsNext,
      };
    case "JUMP":
      return {
        ...state,
        history: state.history.slice(0, action.payload.step + 1),
        xIsNext: action.payload.step % 2 === 0 ? true : false,
      };

    default:
      return state;
  }
};

const calculateWinner = (squares) => {
  let winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let Draw = true;
  for(var i=0;i<winnerLines.length;i++){
      const [a,b,c] = winnerLines[i];
      if(squares[a] && squares[a]===squares[b] && squares[b] ===squares[c] ){
        
        return squares[a];
      }
      if(!squares[a] || !squares[b] || !squares[c]){
        Draw = false;
      }
  }

  if(Draw){
      return 'D'
  }

  return null;
};

function Game() {
  const [state, dispatch] = useReducer(reducer, {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
  });

  const { history, xIsNext } = state;

  const jumpTo = (step) => {
    dispatch({ type: "JUMP", payload: { step } });
  };

  const onClick = (id) => {
    var current = history[history.length - 1];
    var squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (squares[id] || winner) {
      return;
    }
    squares[id] = xIsNext ? "X" : "0";

    dispatch({ type: "MOVE", payload: { squares } });
  };
  var current = history[history.length - 1];
  const squares = current.squares;
  const winner = calculateWinner(squares);
  const status = winner
    ? winner === "D"
      ? "Match is draw"
      : "The winner is " + winner
    : "Next Player is " + (xIsNext ? "X" : "0");

  const markup = history.map((step, move) => {
    const desc = move ? "Go to Move " + move : "Start the Game";

    return (
      <li>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className={winner?"disabled game":"game"}>
      <div>
        <Board values={squares} onClick={(i) =>onClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ul>{markup}</ul>
      </div>
    </div>
  );
}

export default Game;
