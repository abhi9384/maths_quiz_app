import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    --secondary-gradient: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
    --background-gradient: linear-gradient(135deg, #1F2937 0%, #111827 100%);
    --text-primary: #FFFFFF;
    --text-secondary: #E5E7EB;
    --card-bg: rgba(255, 255, 255, 0.1);
    --card-border: rgba(255, 255, 255, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: var(--background-gradient);
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  button {
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalStyles; 