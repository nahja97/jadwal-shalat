import { AppProps } from 'next/app';
import Head from 'next/head';
import Default from "../components/layouts/Default"
import Login from "../components/layouts/Login"
import './styles.css';
import '../styles/global.css';

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
