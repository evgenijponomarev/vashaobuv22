import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Menu from '../components/menu';
import LocationButton from '../components/location-button';
import Container from '../components/container';
import LocationDialog from '../components/location-dialog';
import styleVars from '../styles/vars';

export default function Layout({ children, stores = [], currentStore }) {
  const B = 'layout';

  const [isLocationDialogOpened, toggleLocationDialog] = useState(false);

  return (
    <div className={B}>
      <Head>
        <title>Ваша обувь</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <Menu currentStore={currentStore}/>

        <LocationButton
          onClick={() => toggleLocationDialog(true)}
          currentStore={currentStore}
        />
      </Header>

      <Container mix={`${B}__content`}>
        {children}
      </Container>

      {isLocationDialogOpened && (
        <LocationDialog
          stores={stores}
          onClose={() => toggleLocationDialog(false)}
          onClickStore={() => toggleLocationDialog(false)}
        />
      )}

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        body,
        button,
        a {
          font-family: ${styleVars.fontFamily};
          font-size: 16px;
          font-weight: 300;
          color: #353535;
        }

        * {
          box-sizing: border-box;
        }

        .${B}__content {
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}
