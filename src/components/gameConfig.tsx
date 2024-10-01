'use client';

import React, { useState } from 'react';

interface PlayerConfig {
  id: number;
  color: string;
}

interface GameConfigProps {
  onStartGame: (
    numRows: number,
    numCols: number,
    players: PlayerConfig[]
  ) => void;
}

const GameConfig: React.FC<GameConfigProps> = ({ onStartGame }) => {
  const [numRows, setNumRows] = useState(6);
  const [numCols, setNumCols] = useState(7);
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState<PlayerConfig[]>([
    { id: 1, color: '#FF0000' },
    { id: 2, color: '#FFFF00' },
  ]);

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNumPlayers(value);
    const newPlayers = [...players];
    while (newPlayers.length < value) {
      newPlayers.push({
        id: newPlayers.length + 1,
        color: '#000000',
      });
    }
    setPlayers(newPlayers.slice(0, value));
  };

  const handlePlayerColorChange = (index: number, color: string) => {
    const newPlayers = [...players];
    newPlayers[index].color = color;
    setPlayers(newPlayers);
  };

  const handleStartGame = () => {
    onStartGame(numRows, numCols, players);
  };

  return (
    <div className="p-6 bg-slate-400 rounded-lg shadow-lg flex flex-col items-center w-1/3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Configure Game</h2>
      <div className="space-y-4 text-gray-800">
        <label className="block">
          Number of Rows:
          <input
            className="ml-2 p-2 border-2 border-gray-300 rounded"
            type="number"
            min="4"
            max="10"
            value={numRows}
            onChange={e => setNumRows(parseInt(e.target.value))}
          />
        </label>
        <label className="block">
          Number of Columns:
          <input
            className="ml-2 p-2 border-2 border-gray-300 rounded"
            type="number"
            min="4"
            max="10"
            value={numCols}
            onChange={e => setNumCols(parseInt(e.target.value))}
          />
        </label>
        <label className="block">
          Number of Players:
          <input
            className="ml-2 p-2 border-2 border-gray-300 rounded"
            type="number"
            min="2"
            max="4"
            value={numPlayers}
            onChange={handleNumPlayersChange}
          />
        </label>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Player Colors:
          </h3>
          {players.map((player, index) => (
            <div key={player.id} className="mt-2">
              <label className="inline-flex items-center">
                Player {player.id} Color:
                <input
                  className="ml-2 w-12 h-12 p-2 rounded border-2 border-gray-300 cursor-pointer"
                  type="color"
                  value={player.color}
                  onChange={e => handlePlayerColorChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameConfig;
