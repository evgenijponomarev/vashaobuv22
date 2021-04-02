import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Data from '../lib/data';
import Layout from '../components/layout';
import LocationDialog from '../components/location-dialog';

export default function Home({ stores }) {
  const router = useRouter();

  const [isLocationDialogOpened, toggleLocationDialog] = useState(false);

  useEffect(() => {
    const storeCode = localStorage.getItem('store');
    if (storeCode) {
      router.push(`/new/${storeCode}`);
    } else {
      toggleLocationDialog(true)
    }
  });

  return (
    <Layout>
      {isLocationDialogOpened && <LocationDialog stores={stores}/>};
    </Layout>
  );
}

export async function getStaticProps() {
  const data = new Data();

  return {
    props: {
      stores: data.getStores(),
    },
    revalidate: 10,
  };
}
