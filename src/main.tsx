import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app.tsx';
import { AppProviders } from './app/app-providers.tsx';
import './index.css';

const isMockMovies = false;

async function enableMocking() {
  const { getServer } = await import('./mocks/server/dev-server.ts');
  return getServer({ isMockMovies }).start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
});
