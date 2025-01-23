import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import Button from '../common/Button';
import DifficultySelector from './DifficultySelector';

const MenuContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFB88C 100%);
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '3rem'};
  color: white;
  user-select: none;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.3));
  z-index: 1;
`;

const Content = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 2;
`;

const Title = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 1rem;
  transform: rotate(0deg);
`;

const MainTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 900;
  font-family: 'Bangers', cursive;
  text-transform: uppercase;
  position: relative;
  padding: 0.5rem 0;
  letter-spacing: 2px;
  transform: rotate(0deg);
  
  /* Funky gradient text */
  background: linear-gradient(
    to bottom,
    #FF61D8 0%,
    #FE9090 30%, 
    #FFD85B 60%,
    #6DC7FF 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  /* Comic-style stroke */
  -webkit-text-stroke: 2px #4158D0;
  
  /* Funky shadow effect */
  filter: drop-shadow(0px 0px 10px rgba(255, 97, 216, 0.5))
         drop-shadow(0px 0px 20px rgba(65, 88, 208, 0.3));

  /* Bouncy animation - now just up and down, no rotation */
  animation: bounce 2s infinite;

  @keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const LeaderboardButton = styled(Button)`
  background: var(--secondary-gradient);
`;

const MainMenu = () => {
  const { setGameState } = useGame();

  return (
    <MenuContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Title>
        <MainTitle>Math Challenge</MainTitle>
      </Title>
      <DifficultySelector />
      <ButtonGroup>
        <Button onClick={() => setGameState('playing')}>
          Start Game
        </Button>
        <LeaderboardButton onClick={() => setGameState('ended')}>
          Leaderboard
        </LeaderboardButton>
      </ButtonGroup>
    </MenuContainer>
  );
};

export default MainMenu; 