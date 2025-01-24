const difficultyRanges = {
  easy: { min: 1, max: 10 },
  medium: { min: 11, max: 50 },
  hard: { min: 51, max: 200 }
};

const operations = ['+', '-', '*'];

export const generateQuestion = (difficulty) => {
  const range = difficultyRanges[difficulty];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  let num2 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

  let answer;
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
       // Ensure num1 >= num2 for easy level subtraction
       if (difficulty === 'easy' && num2 > num1) {
        [num1, num2] = [num2, num1];  // Swap num1 and num2 to avoid negative results
      }
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
      case '/':
        answer = num1 / num2;
        break;  
    default:
      answer = 0;
  }

  return {
    question: `${num1} ${operation} ${num2}`,
    answer: answer
  };
};

export const checkAnswer = (userAnswer, correctAnswer) => {
  return parseInt(userAnswer) === correctAnswer;
}; 