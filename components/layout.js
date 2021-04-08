import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import proptypes from '../lib/proptypes';
import Header from './header';
import Menu from './menu';
import LocationButton from './location-button';
import Container from './container';
import LocationDialog from './location-dialog';
import styleVars from '../styles/vars';

export default function Layout({ children, stores, title }) {
  const B = 'layout';

  const router = useRouter();

  const currentStoreCode = router.query.storeCode;
  const currentStoreName = stores.find(({ code }) => code === currentStoreCode)?.name ?? '';

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

          {currentStoreName && (
            <LocationButton
              onClick={() => toggleLocationDialog(true)}
              storeName={currentStoreName}
            />
          )}
        </Header>
      </div>

      <Container mix={`${B}__content`}>
        {title && <h1 className={`${B}__title`}>{title}</h1>}

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

        .${B}__title {
          font-weight: 300;
          padding: 10px;
          margin: 0;
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
  title: '',
  children: null,
};

Layout.propTypes = {
  stores: proptypes.stores,
  title: proptypes.string,
  children: proptypes.node,
};
