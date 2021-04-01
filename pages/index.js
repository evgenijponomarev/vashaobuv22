import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import stores from '../data/stores.json';
import Layout from '../components/layout';
import LocationDialog from '../components/location-dialog';

export default function Home() {
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
    <Layout stores={stores}>
      {isLocationDialogOpened && <LocationDialog stores={stores}/>}
    </Layout>
  );
}
