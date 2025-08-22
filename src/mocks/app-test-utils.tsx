import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../components/app-providers/auth-provider/auth-provider';
import { ThemeProvider } from '../components/app-providers/theme-provider/theme-provider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const waitForLoadingToFinish = async () => {
  const getLoadingElements = () => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ];

  const initialLoadingElements = [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ];

  if (initialLoadingElements.length > 0) {
    await waitForElementToBeRemoved(getLoadingElements);
  }
};

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
