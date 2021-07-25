import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import Default from "../layouts/Default"
import Login from "../layouts/Login"
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  const Layout = pageProps.layout == 'login' ? Login : Default
  return (
    <>
      <Head>
        <title>{pageProps.layout == 'login' ? 'Login Page' : (pageProps.meta?.title != undefined ? pageProps.meta?.title + ' - Jadwal Shalat' : 'Jadwal Shalat')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content= {pageProps.layout == 'login' ? 'Login Page' : (pageProps.meta?.description != undefined ? pageProps.meta?.description : 'Jadwal Shalat')}/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
