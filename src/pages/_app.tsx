import type { AppProps } from 'next/app';

import Layout from '~/layout';
import Providers from '~/providers/index';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
};

export default App;
