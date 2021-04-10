import proptypes from '../../lib/proptypes';
import { getStores, getBannerLinks } from '../../lib/data';
import Layout from '../../components/layout';
import ProfitLink from '../../components/profit-link';
import BannerList from '../../components/banner-list';

export default function Actions({ stores, banners = [] }) {
  return (
    <Layout stores={stores} title="Акции">
      <ProfitLink/>

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
      stores: getStores(),
      banners: getBannerLinks(params.storeCode),
    },
    revalidate: 10,
  };
}

Actions.propTypes = {
  stores: proptypes.stores.isRequired,
  banners: proptypes.banners.isRequired,
};
