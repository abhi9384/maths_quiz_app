import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TimerContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
`;

const TimerBar = styled(motion.div)`
  height: 8px;
  background: var(--primary-gradient);
  border-radius: 4px;
`;

const TimeText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: var(--text-secondary);
`;

const Timer = ({ duration = 60, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <TimerContainer>
      <AnimatePresence>
        <TimerBar
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / duration) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </AnimatePresence>
      <TimeText>{timeLeft}s</TimeText>
    </TimerContainer>
  );
};

export default Timer; 