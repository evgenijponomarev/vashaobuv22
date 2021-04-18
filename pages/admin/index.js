import { useRouter } from 'next/router';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from '../../lib/prop-types';
import { getStores, getBannerLinks } from '../../lib/data';
import apiHelpers from '../../lib/api-helpers';
import Layout from '../../components/layout';
import AdminTabs from '../../components/admin-tabs';
import AdminPhotoGallery from '../../components/admin-photo-gallery';
import AdminUploadForm from '../../components/admin-upload-form';

const API_URL = '/api/banners';

export default function AdminBannersPage({ stores, banners, apiPassword }) {
  const router = useRouter();

  const bannersByStore = stores.reduce((acc, store) => ({
    ...acc,
    [store.code]: banners.filter((link) => link.includes(store.code)),
  }), {});

  async function onDelete(bannerLink) {
    if (!window.confirm('Это взвешенное решение?')) return;

    const fileName = _.last(bannerLink.split('/'));

    try {
      await axios.delete(`${API_URL}?fileName=${fileName}&apiPassword=${apiPassword}`);
      router.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout title="Баннеры" isAdmin>
      <AdminTabs
        tabList={stores.map(({ name }) => name)}
        contentList={stores.map((store) => ({
          key: store.code,
          content: (
            <>
              <AdminUploadForm
                action={API_URL}
                fieldName="banner"
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
                photos={bannersByStore[store.code]}
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
      banners: getBannerLinks(),
      apiPassword: apiHelpers.createPassword(),
    },
  };
}

AdminBannersPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  banners: PropTypes.photos.isRequired,
  apiPassword: PropTypes.string.isRequired,
};
