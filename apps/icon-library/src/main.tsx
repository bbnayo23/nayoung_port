import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './showcase/App.tsx';
import './showcase/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
