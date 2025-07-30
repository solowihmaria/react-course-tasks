import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/main.css';
import { ThemeProvider } from './contexts/ThemeProvider';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  );
}
