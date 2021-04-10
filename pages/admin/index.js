import _ from 'lodash';
import axios from 'axios';
import { useState } from 'react';
import proptypes from '../../lib/proptypes';
import { getStores, getBanners } from '../../lib/data';
import Layout from '../../components/layout';
import AdminPanel from '../../components/admin-panel';
import AdminTabs from '../../components/admin-tabs';
import AdminBannerList from '../../components/admin-banner-list';
import AdminUploadForm from '../../components/admin-upload-form';

export default function AdminBanners({ stores, banners }) {
  const [bannersByStore, setBannersByStore] = useState(stores.reduce((acc, store) => ({
    ...acc,
    [store.code]: banners.filter((link) => link.includes(store.code)),
  }), {}));

  async function onDelete(bannerLink) {
    if (!window.confirm('Точно?')) return;

    const [fileName, fileExt] = _.last(bannerLink.split('/')).split('.');
    const [storeCode, bannerNum] = fileName.split('_banner_');
    const query = Object.entries({ storeCode, bannerNum, fileExt })
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    try {
      await axios.delete(`/api/banners?${query}`);

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
      <AdminPanel>
        <AdminTabs
          tabList={stores.map(({ name }) => name)}
          contentList={stores.map((store) => ({
            key: store.code,
            content: (
              <>
                <AdminUploadForm
                  action="/api/banners"
                  fieldName="banner"
                  hiddenFields={[{
                    key: 'store',
                    value: store.code,
                  }]}
                />

                <AdminBannerList banners={bannersByStore[store.code]} onDelete={onDelete}/>
              </>
            ),
          }))}
        />
      </AdminPanel>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      stores: getStores(),
      banners: getBanners(),
    },
    revalidate: 10,
  };
}

AdminBanners.propTypes = {
  stores: proptypes.stores.isRequired,
  banners: proptypes.banners.isRequired,
};
