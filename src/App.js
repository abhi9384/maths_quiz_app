import { GameProvider } from './contexts/GameContext';
import GlobalStyles from './styles/GlobalStyles';
import MainMenu from './components/menu/MainMenu';
import GameScreen from './components/game/GameScreen';
import Leaderboard from './components/leaderboard/Leaderboard';
import { useGame } from './contexts/GameContext';

const GameStateManager = () => {
  const { gameState } = useGame();

  switch (gameState) {
    case 'menu':
      return <MainMenu />;
    case 'playing':
      return <GameScreen />;
    case 'ended':
      return <Leaderboard />;
    default:
      return <MainMenu />;
  }
};

function App() {
  return (
    <GameProvider>
      <GlobalStyles />
      <GameStateManager />
    </GameProvider>
  );
}

export default App;
