// useTicTacToe.js
import { useState } from 'react';

const EMPTY_BOARD = Array.from({ length: 9 }).fill('_').join('');

function wins(player, board) {
  return [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ].some(
    (line) => line.map((i) => board[i]).every((sq) => sq === player),
  );
} // function win

/* Hook to play TicTacToe. Use as follows:

  const {
    activePlayer, board, isFinished, move, moves, restart, result, winner, loser,
  } = useTicTacToe();

*/
export function useTicTacToe(initialBoard = undefined) {
  const [board, setBoard] = useState(initialBoard ?? EMPTY_BOARD);
  const emptySquaresIndices = [...board].map((s, i) => [s, i]).filter(([s]) => s === '_').map(([,i]) => i);
  const victoryX = wins('X', board);
  const victoryO = wins('O', board);
  const isFinished = victoryX || victoryO || emptySquaresIndices.length < 1;
  const activePlayer = finished ? null : emptySquaresIndices.length % 2 === 1 ? 'X' : 'O';
  const result = !isFinished ? null : {
    X: victoryX - victoryO,
    O: victoryO - victoryX,
  };

  return {
    // The player that can move, either 'X' or 'O'.
    activePlayer,

    // The board as a string.
    board,
    
    // Whether the game is finished or not (boolean).
    isFinished,
    
    // A function to perform a move and advance the game.
    move(player, squareIndex) {
      if (player !== activePlayer) {
        throw new Error(`Player ${player} is not active!`);
      }
      if (!emptySquaresIndices.includes(squareIndex)) {
        throw new Error(`Square #${squareIndex} is not empty!`);
      }
      const newBoard = [...board];
      newBoard[squareIndex] = player;
      setBoard(newBoard.join(''));
    },
    
    // The valid moves for the active player.
    moves: [...emptySquaresIndices],
    
    // A function to reset the board.
    restart(board = undefined) {
      setBoard(board ?? EMPTY_BOARD);
    },
    
    // The result of the game 
    result,

    // The winner of the game, or null if the game is not finished or tied.
    loser: victoryX ? 'O' : victoryO ? 'X' : null,

    // The loser of the game, or null if the game is not finished or tied.
    winner: victoryX ? 'X' : victoryO ? 'O' : null, 
  };
} // function useTicTacToe
