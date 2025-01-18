import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../components/auth/auth-provider/auth-provider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const waitForLoadingToFinish = async () =>
  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

export const renderWithProviders = async (
  ui: ReactElement,
  { route }: { route?: string } = {},
) => {
  if (route) {
    window.history.pushState({}, 'Test page', route);
  }

  render(
    <BrowserRouter>
      <QueryClientProvider client={createTestQueryClient()}>
        <AuthProvider>{ui}</AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>,
  );

  await waitForLoadingToFinish();
};
