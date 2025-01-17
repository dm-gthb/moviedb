import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app.tsx';
import { AppProviders } from './app/app-providers.tsx';
import './index.css';

async function enableMocking() {
  const { server } = await import('./mocks/server/dev-server.ts');
  return server.start({
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
