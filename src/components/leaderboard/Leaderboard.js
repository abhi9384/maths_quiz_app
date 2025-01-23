import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import Button from '../common/Button';

const LeaderboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-primary);
`;

const ScoresList = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
`;

const ScoreItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  
  &:last-child {
    border-bottom: none;
  }

  ${props => props.isCurrentUser && `
    background: var(--primary-gradient);
    border-radius: 8px;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const NameInput = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
  }
`;

const RankBadge = styled.span`
  background: ${props => {
    if (props.rank === 1) return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
    if (props.rank === 2) return 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)';
    if (props.rank === 3) return 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const Leaderboard = () => {
  const { score, setGameState, setScore, highScores, addHighScore } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isGameOver = score > 0; // Check if coming from a game

  const handleSubmitScore = () => {
    if (!playerName.trim()) return;
    addHighScore(playerName, score);
    setIsSubmitted(true);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameState('menu');
  };

  return (
    <LeaderboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Title>{isGameOver ? 'Game Over!' : 'Leaderboard'}</Title>
      
      {isGameOver && (
        <ScoreDisplay>Your Score: {score}</ScoreDisplay>
      )}

      {isGameOver && !isSubmitted && (
        <>
          <NameInput
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
          />
          <Button onClick={handleSubmitScore}>Submit Score</Button>
        </>
      )}

      <ScoresList>
        <h3 style={{ padding: '0.5rem 1rem', color: 'var(--text-primary)' }}>Top Scores</h3>
        <AnimatePresence>
          {highScores.map((scoreItem, index) => (
            <ScoreItem
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              isCurrentUser={isSubmitted && scoreItem.playerName === playerName}
            >
              <span>
                <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                {scoreItem.playerName}
              </span>
              <span>{scoreItem.score}</span>
            </ScoreItem>
          ))}
        </AnimatePresence>
      </ScoresList>

      <ButtonGroup>
        {isGameOver ? (
          <>
            <Button onClick={handlePlayAgain}>Play Again</Button>
            <Button onClick={() => setGameState('menu')}>Main Menu</Button>
          </>
        ) : (
          <Button onClick={() => setGameState('menu')}>Back to Menu</Button>
        )}
      </ButtonGroup>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 