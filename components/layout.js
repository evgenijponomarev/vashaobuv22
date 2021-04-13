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

export default function Layout({
  storeCode,
  pathname,
  children,
  stores,
  title,
  isAdmin,
}) {
  const B = 'layout';

  const router = useRouter();

  const [isLocationDialogOpened, toggleLocationDialog] = useState(false);

  const storeName = stores.find(({ code }) => code === storeCode)?.name ?? '';

  useEffect(() => {
    const userStoreCode = localStorage.getItem('store');

    if (storeCode && storeCode !== userStoreCode) localStorage.setItem('store', storeCode);
  }, [storeCode]);

  return (
    <div className={B}>
      <Head>
        <title>Ваша обувь</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${B}__header`}>
        <Header>
          <Menu storeCode={storeCode} isAdmin={isAdmin}/>

          {storeName && (
            <LocationButton
              onClick={() => toggleLocationDialog(true)}
              storeName={storeName}
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
          pathname={pathname || router.pathname}
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
  storeCode: '',
  pathname: '',
  stores: [],
  title: '',
  children: null,
  isAdmin: false,
};

Layout.propTypes = {
  storeCode: proptypes.string,
  pathname: proptypes.string,
  stores: proptypes.stores,
  title: proptypes.string,
  children: proptypes.node,
  isAdmin: proptypes.bool,
};
