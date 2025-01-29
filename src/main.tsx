import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app.tsx';
import { AppProviders } from './app/app-providers.tsx';
import { startServer } from './mocks/server/dev-server.ts';
import './index.css';

startServer().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
});
