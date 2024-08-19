'use client';

import { theme } from '@/shared';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { StoreProvider, ToastProvider } from './lib';

interface RootProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};
