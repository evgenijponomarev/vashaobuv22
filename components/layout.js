import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Menu from '../components/menu';
import LocationButton from '../components/location-button';
import Container from '../components/container';
import LocationDialog from '../components/location-dialog';

export default function Layout({ children, stores = [] }) {
  const B = 'layout';

  const currentStore = stores.find(store => store.isCurrent);
  const currentStoreCode = currentStore?.code ?? '';
  const currentStoreName = currentStore?.name ?? '';

  const [isLocationDialogOpened, toggleLocationDialog] = useState(false);

  useEffect(() => {
    const userStoreCode = localStorage.getItem('store');

    if (currentStoreCode && currentStoreCode !== userStoreCode) {
      localStorage.setItem('store', currentStoreCode);
    }
  });

  return (
    <div className={B}>
      <Head>
        <title>Ваша обувь</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <Menu/>

        <LocationButton
          onClick={() => toggleLocationDialog(true)}
          storeName={currentStoreName}
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
        .${B}__content {
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}
