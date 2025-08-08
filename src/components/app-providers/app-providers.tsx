import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth-provider/auth-provider.tsx';
import { ThemeProvider } from './theme-provider/theme-provider.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (_error, query) => {
        return typeof query.state.data === 'undefined';
      },
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
