import { useRouter } from 'next/router';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from '../../lib/prop-types';
import { getStores, getContacts, getAllStorePhotos } from '../../lib/data';
import apiHelpers from '../../lib/api-helpers';
import Layout from '../../components/layout';
import AdminTabs from '../../components/admin-tabs';
import AdminPhotoGallery from '../../components/admin-photo-gallery';
import AdminUploadForm from '../../components/admin-upload-form';
import AdminContactsForm from '../../components/admin-contacts-form';

const API_URL = '/api/contacts';

export default function AdminContactsPage({
  stores,
  contacts,
  photos,
  apiPassword,
}) {
  const router = useRouter();

  const photosByStore = stores.reduce((acc, store) => ({
    ...acc,
    [store.code]: photos.filter((link) => link.includes(store.code)),
  }), {});

  async function onDelete(photoLink) {
    if (!window.confirm('Это взвешенное решение?')) return;

    const fileName = _.last(photoLink.split('/'));

    try {
      await axios.delete(`${API_URL}/photos?fileName=${fileName}&apiPassword=${apiPassword}`);
      router.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout title="Контакты" isAdmin>
      <AdminTabs
        tabList={stores.map(({ name }) => name)}
        contentList={stores.map((store) => ({
          key: store.code,
          content: (
            <>
              <AdminContactsForm
                contacts={contacts.find(({ store_code }) => store_code === store.code)}
                action={API_URL}
                storeName={store.name}
                apiPassword={apiPassword}
              />

              <AdminUploadForm
                action={`${API_URL}/photos`}
                fieldName="photo"
                hiddenFields={[
                  {
                    key: 'storeCode',
                    value: store.code,
                  },
                  {
                    key: 'apiPassword',
                    value: apiPassword,
                  },
                ]}
                onSubmit={() => router.reload()}
              />

              <AdminPhotoGallery
                photos={photosByStore[store.code]}
                onDelete={onDelete}
              />
            </>
          ),
        }))}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      stores: getStores(),
      contacts: getContacts(),
      photos: getAllStorePhotos(),
      apiPassword: apiHelpers.createPassword(),
    },
  };
}

AdminContactsPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.contacts).isRequired,
  photos: PropTypes.photos.isRequired,
  apiPassword: PropTypes.string.isRequired,
};
