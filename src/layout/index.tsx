'use client';

import { Box, Center } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Center transition="0.5s ease-out">
      <Box maxWidth={800} margin={8}>
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Center>
  );
};

export default Layout;
