import {
  ChakraProvider as DefaultChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import customTheme from '~/styles/theme';

const ChakraProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ColorModeScript
        initialColorMode={customTheme.config?.initialColorMode}
        type="cookie"
      />
      <DefaultChakraProvider
        colorModeManager={cookieStorageManager}
        theme={customTheme}
      >
        {children}
      </DefaultChakraProvider>
    </>
  );
};

export default ChakraProvider;
