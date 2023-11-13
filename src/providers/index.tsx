'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ChakraProvider from './ChakraProvider';

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
