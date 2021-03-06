import PropTypes from '../../lib/prop-types';
import { getStores, getBannerLinks } from '../../lib/data';
import Layout from '../../components/layout';
import ProfitLink from '../../components/profit-link';
import BannerList from '../../components/banner-list';

export default function ActionsPage({ storeCode, stores, banners }) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Акции">
      <ProfitLink storeCode={storeCode}/>

      <BannerList banners={banners}/>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      storeCode: query.storeCode,
      stores: getStores(),
      banners: getBannerLinks(query.storeCode).reverse(),
    },
  };
}

ActionsPage.defaultProps = {
  banners: [],
};

ActionsPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  banners: PropTypes.photos,
  storeCode: PropTypes.string.isRequired,
};
