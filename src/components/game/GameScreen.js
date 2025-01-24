import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import Timer from './Timer';
import NumberPad from './NumberPad';
import { generateQuestion, checkAnswer } from '../../utils/gameLogic';

const GameContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFB88C 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const GameCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;  // Increased from 360px
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerAndScore = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 0 10px;  // Added padding for wider spacing
`;

const TimerContainer = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #4158D0;
  background: rgba(255, 255, 255, 0.9);
  padding: 3px 10px;
  border-radius: 8px;
`;

const ScoreContainer = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #4158D0;
  background: rgba(255, 255, 255, 0.9);
  padding: 3px 10px;
  border-radius: 8px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
`;

const Question = styled(motion.div)`
  font-size: 2.3rem;  // Slightly larger
  font-weight: bold;
  color: #4158D0;
  margin-bottom: 8px;
  line-height: 1.2;
  text-align: center;
  width: 90%;  // Added width control
`;

const AnswerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;  // Center the Answer component
  align-items: center;
  margin-bottom: 5px;
`;

const Answer = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: #4158D0;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.4rem 1rem;  // Added horizontal padding
  border-radius: 12px;
  border: 2px solid #4158D0;
  min-height: 45px;
  min-width: 120px;     // Added minimum width
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;       // Center horizontally
  margin-bottom: 5px;
  text-align: center;   // Center text
`;

const NumberPadContainer = styled.div`
  width: 100%;
  max-width: 250px;
  margin: 3px 0;
`;

const NumberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 5px;
`;

const NumberKey = styled(motion.button)`
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  background: white;
  font-size: 1.2rem;
  font-weight: bold;
  color: #4158D0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 36px;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4158D0 0%, #C850C0 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 3px;
`;

const SkipQuestionButton = styled(motion.button)`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #FF5F5F 0%, #C850C0 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 3px;
`;

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  pointer-events: none;
  z-index: 10;
`;

const FeedbackMessage = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.isCorrect ? '#4CAF50' : '#FF0000'};
  text-align: center;
  min-height: 24px;  // Changed from fixed height
  margin: 5px 0;     // Increased margin
  padding: 2px 0;    // Added padding
  width: 100%;
  position: relative; // Ensure it stays above other elements
  z-index: 5;        // Added z-index to keep it above buttons
  background: rgba(255, 255, 255, 0.9); // Semi-transparent background
  border-radius: 8px;
`;

const GameScreen = () => {
  const { difficulty, score, setScore, setGameState } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setCurrentQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  const handleKeyPress = (key) => {
    if (userAnswer.length < 5) {
      setUserAnswer(prev => prev + key);
    }
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const createFloatingEmoji = (isCorrect) => {
    const emoji = isCorrect ? '✨' : '❌';
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    
    return (
      <FloatingEmoji
        initial={{ x: randomX, y: randomY, opacity: 1, scale: 1 }}
        animate={{ y: randomY - 100, opacity: 0, scale: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {emoji}
      </FloatingEmoji>
    );
  };

  const handleSubmit = () => {
    if (!userAnswer) return;

    const correct = checkAnswer(parseInt(userAnswer), currentQuestion.answer);
    
    if (correct) {
      setScore(prev => prev + 1);
      setFeedback('Correct! 🎉');
      setTimeout(() => {
        setFeedback('');
        setCurrentQuestion(generateQuestion(difficulty));
        setUserAnswer('');
      }, 1000);
    } else {
      setFeedback('Wrong answer! Try again ❌');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  const handleSkipQuestion = () => {
    setCurrentQuestion(generateQuestion(difficulty));
    setUserAnswer('');
  };

  const handleTimeUp = () => {
    setGameState('ended');
  };

  return (
    <GameContainer>
      <GameCard>
        <TimerAndScore>
          <TimerContainer>
            Time: <Timer onTimeUp={() => setGameState('ended')} />
          </TimerContainer>
          <ScoreContainer>
            Score: {score}
          </ScoreContainer>
        </TimerAndScore>

        <QuestionContainer>
          <Question>{currentQuestion?.question}</Question>
        </QuestionContainer>

        <AnswerContainer>
          <Answer>{userAnswer || '?'}</Answer>
        </AnswerContainer>

        <FeedbackMessage isCorrect={userAnswer && checkAnswer(parseInt(userAnswer), currentQuestion.answer)}>
          {feedback}
        </FeedbackMessage>

        <NumberPadContainer>
          <NumberGrid>
            {[7, 8, 9, 
              4, 5, 6, 
              1, 2, 3,
              '-', 0, '⌫'
            ].map((num) => (
              <NumberKey
                key={num}
                onClick={() => {
                  switch(num) {
                    case '⌫':
                      handleClear();
                      break;
                    case '-':
                      if (!userAnswer.includes('-')) {
                        handleKeyPress('-');
                      }
                      break;
                    default:
                      handleKeyPress(num.toString());
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {num}
              </NumberKey>
            ))}
          </NumberGrid>

          <SkipQuestionButton
            onClick={handleSkipQuestion}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Skip Question
          </SkipQuestionButton>

          <SubmitButton
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </SubmitButton>
        </NumberPadContainer>
      </GameCard>
    </GameContainer>
  );
};

export default GameScreen; 