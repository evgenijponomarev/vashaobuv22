import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import proptypes from '../lib/proptypes';
import { getStores } from '../lib/data';
import Layout from '../components/layout';
import LocationDialog from '../components/location-dialog';

export default function Home({ stores }) {
  const router = useRouter();

  const [isLocationDialogOpened, toggleLocationDialog] = useState(false);

  useEffect(() => {
    const storeCode = localStorage.getItem('store');

    if (storeCode) {
      router.push({
        pathname: '/new/[storeCode]',
        query: { storeCode },
      });
    } else {
      toggleLocationDialog(true);
    }
  });

  return (
    <Layout pathname="/new/[storeCode]">
      {isLocationDialogOpened && <LocationDialog stores={stores}/>}
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      stores: getStores(),
    },
    revalidate: 10,
  };
}

Home.propTypes = {
  stores: proptypes.stores.isRequired,
};
