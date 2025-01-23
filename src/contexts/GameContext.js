import { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameState, setGameState] = useState('menu');
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : [];
  });

  const addHighScore = (playerName, score) => {
    const newScore = { playerName, score, date: new Date().toISOString() };
    const newScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setHighScores(newScores);
    localStorage.setItem('highScores', JSON.stringify(newScores));
  };

  const value = {
    score,
    setScore,
    difficulty,
    setDifficulty,
    gameState,
    setGameState,
    highScores,
    addHighScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 