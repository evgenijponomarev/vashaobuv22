import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from '../lib/prop-types';
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

  const isExistingStore = stores.find(({ code }) => code === storeCode);

  const storeName = stores.find(({ code }) => code === storeCode)?.name ?? 'Выберите ваш магазин';

  useEffect(() => {
    if (isAdmin) return;

    const userStoreCode = localStorage.getItem('store');

    if (!isExistingStore) {
      if (userStoreCode) {
        router.push({
          pathname: '/new/[storeCode]',
          query: {
            storeCode: userStoreCode,
          },
        });
      } else {
        toggleLocationDialog(true);
      }
    } else if (storeCode !== userStoreCode) {
      localStorage.setItem('store', storeCode);
    }
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
          onClose={isExistingStore ? () => toggleLocationDialog(false) : null}
          onClickStore={() => toggleLocationDialog(false)}
        />
      )}

      <style jsx global>
        {`
        .${B}__header {
          height: ${styleVars.headerHeigh}px;
        }

        .${B}__title {
          font-weight: 300;
          padding: ${styleVars.padding}px;
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
  storeCode: PropTypes.string,
  pathname: PropTypes.string,
  stores: PropTypes.stores,
  title: PropTypes.string,
  children: PropTypes.node,
  isAdmin: PropTypes.bool,
};
