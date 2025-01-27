import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../components/auth/auth-provider/auth-provider';
import { ThemeProvider } from '../components/shared/theme/theme-provider/theme-provider';

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
        <ThemeProvider>
          <AuthProvider>{ui}</AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>,
  );

  await waitForLoadingToFinish();
};
