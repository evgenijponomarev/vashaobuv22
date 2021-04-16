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

export async function getStaticPaths() {
  const paths = getStores().map(({ code }) => ({
    params: {
      storeCode: code,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      storeCode: params.storeCode,
      stores: getStores(),
      banners: getBannerLinks(params.storeCode).reverse(),
    },
    revalidate: 10,
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
