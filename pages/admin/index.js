import _ from 'lodash';
import axios from 'axios';
import { useState } from 'react';
import initializeBasicAuth from 'nextjs-basic-auth';
import PropTypes from '../../lib/prop-types';
import { getStores, getBannerLinks } from '../../lib/data';
import Layout from '../../components/layout';
import AdminTabs from '../../components/admin-tabs';
import AdminBannerList from '../../components/admin-banner-list';
import AdminUploadForm from '../../components/admin-upload-form';
import users from '../../secret/users.json';

const API_URL = '/api/banners';

const basicAuthCheck = initializeBasicAuth({ users });

export default function AdminBannersPage({ stores, banners }) {
  const [bannersByStore, setBannersByStore] = useState(stores.reduce((acc, store) => ({
    ...acc,
    [store.code]: banners.filter((link) => link.includes(store.code)),
  }), {}));

  async function onDelete(bannerLink) {
    if (!window.confirm('Это взвешенное решение?')) return;

    const fileName = _.last(bannerLink.split('/'));
    const storeCode = _.head(fileName.split('_banner_'));

    try {
      await axios.delete(`${API_URL}?fileName=${fileName}`);

      setBannersByStore({
        ...bannersByStore,
        [storeCode]: bannersByStore[storeCode].filter((link) => link !== bannerLink),
      });
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
                hiddenFields={[{
                  key: 'storeCode',
                  value: store.code,
                }]}
              />

              <AdminBannerList
                banners={bannersByStore[store.code]}
                onDelete={onDelete}
              />
            </>
          ),
        }))}
      />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await basicAuthCheck(req, res);

  return {
    props: {
      stores: getStores(),
      banners: getBannerLinks(),
    },
  };
}

AdminBannersPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  banners: PropTypes.banners.isRequired,
};
