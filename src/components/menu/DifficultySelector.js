import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 1rem 0;
`;

const DifficultyButton = styled(motion.button)`
  padding: 15px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: ${props => props.selected ? 
    'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)' : 
    'rgba(255, 255, 255, 0.05)'};
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DifficultySelector = () => {
  const { difficulty, setDifficulty } = useGame();

  const difficulties = [
    { id: 'easy', label: 'Easy (1-10)' },
    { id: 'medium', label: 'Medium (11-50)' },
    { id: 'hard', label: 'Hard (51-100)' }
  ];

  return (
    <Container>
      {difficulties.map(({ id, label }) => (
        <DifficultyButton
          key={id}
          selected={difficulty === id}
          onClick={() => setDifficulty(id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {label}
        </DifficultyButton>
      ))}
    </Container>
  );
};

export default DifficultySelector; 