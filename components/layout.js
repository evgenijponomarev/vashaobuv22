import { useState, useEffect } from 'react';
import Head from 'next/head';
import proptypes from '../lib/proptypes';
import Header from './header';
import Menu from './menu';
import LocationButton from './location-button';
import Container from './container';
import LocationDialog from './location-dialog';
import styleVars from '../styles/vars';

export default function Layout({ children, stores }) {
  const B = 'layout';

  const currentStore = stores.find((store) => store.isCurrent);
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

      <div className={`${B}__header`}>
        <Header>
          <Menu/>

          <LocationButton
            onClick={() => toggleLocationDialog(true)}
            storeName={currentStoreName}
          />
        </Header>
      </div>

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

      <style jsx global>
        {`
        .${B}__header {
          height: ${styleVars.headerHeigh};
        }

        .${B}__content {
          padding: 20px 0;
        }
      `}
      </style>
    </div>
  );
}

Layout.defaultProps = {
  stores: [],
};

Layout.propTypes = {
  stores: proptypes.stores,
  children: proptypes.node.isRequired,
};
