"use client";

import React, { useState } from 'react';
import { ConnectFourGame } from '../../ConnectFourGame';
import GameConfig from './gameConfig';
import './game.css';

interface PlayerConfig {
  id: number;
  color: string;
}

const Game: React.FC = () => {
  const [game, setGame] = useState<ConnectFourGame | null>(null);
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState('');
  const [players, setPlayers] = useState<PlayerConfig[]>([]);

  const handleStartGame = (
    numRows: number,
    numCols: number,
    playerConfigs: PlayerConfig[]
  ) => {
    const newGame = new ConnectFourGame(numRows, numCols, playerConfigs.length);
    setGame(newGame);
    setBoard(newGame.board);
    setCurrentPlayer(newGame.currentPlayer);
    setMessage(`Player ${newGame.currentPlayer}'s turn`);
    setPlayers(playerConfigs);
  };

  const handleColumnClick = (colIndex: number) => {
    if (game && !game.gameOver) {
      const moveMade = game.makeMove(colIndex);
      if (moveMade) {
        setBoard([...game.board]); // Update board state
        if (game.gameOver) {
          if (game.winner) {
            const winnerColor = players.find(
              (p) => p.id === game.winner
            )?.color;
            setMessage(
              `Player ${game.winner} wins!`
            );
          } else {
            setMessage('Game is a draw.');
          }
        } else {
          setCurrentPlayer(game.currentPlayer);
          setMessage(`Player ${game.currentPlayer}'s turn`);
        }
      } else {
        setMessage('Invalid move. Try another column.');
      }
    }
  };

  const startNewGame = () => {
    setGame(null);
    setBoard([]);
    setCurrentPlayer(1);
    setMessage('');
    setPlayers([]);
  };

  if (!game) {
    return (
      <div className="p-10 flex align-middle justify-center">
        <GameConfig onStartGame={handleStartGame} />
      </div>
    )
  }

 return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold text-white mb-4">Connect Four</h1>
      <div className="board grid grid-cols-7 gap-1">
        {board.slice().reverse().map((row, rowIndex) => (
          <div key={rowIndex} className="row flex justify-center gap-1">
            {row.map((cell, colIndex) => {
              const adjustedRowIndex = board.length - 1 - rowIndex;
              const cellValue = board[adjustedRowIndex][colIndex];
              const playerColor = players.find(p => p.id === cellValue)?.color || 'transparent';
              return (
                <div
                  key={colIndex}
                  className="cell w-10 h-10 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center"
                  onClick={() => handleColumnClick(colIndex)}
                >
                  <div
                    className="disc w-8 h-8 rounded-full"
                    style={{ backgroundColor: playerColor }}
                  ></div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="text-lg text-white mt-2">{message}</p>
      {game.gameOver && <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow" onClick={startNewGame}>Start New Game</button>}
    </div>
  ); 
};

export default Game;
