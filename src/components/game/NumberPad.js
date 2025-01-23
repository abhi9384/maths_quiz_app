import styled from 'styled-components';
import { motion } from 'framer-motion';

const Pad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 280px;
  margin: 0.5rem auto;
  padding: 0.5rem;
`;

const Key = styled(motion.button)`
  padding: 0.6rem;
  border-radius: 12px;
  border: none;
  background: white;
  font-size: 1.2rem;
  font-weight: 600;
  color: #4158D0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  margin: 0 auto;

  &:active {
    background: #f0f0f0;
  }
`;

const SubmitKey = styled(Key)`
  grid-column: span 3;
  aspect-ratio: auto;
  background: linear-gradient(135deg, #4158D0 0%, #C850C0 100%);
  color: white;
  font-size: 1.1rem;
  padding: 0.5rem;
  width: 100%;
  height: 40px;
  margin-top: 0.2rem;
`;

const NumberPad = ({ onKeyPress, onSubmit, onClear }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '⌫'];

  return (
    <Pad>
      {keys.map((key) => (
        <Key
          key={key}
          onClick={() => {
            if (key === '⌫') {
              onClear();
            } else {
              onKeyPress(key);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {key}
        </Key>
      ))}
      <SubmitKey
        onClick={onSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit
      </SubmitKey>
    </Pad>
  );
};

export default NumberPad; 