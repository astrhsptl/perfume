import { AppLoader } from '@/pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import '../shared/styles/base.css';
import { ToastProvider } from './providers';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Suspense fallback={<AppLoader />}>{children}</Suspense>
        </ToastProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
