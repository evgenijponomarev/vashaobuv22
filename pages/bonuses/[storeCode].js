import PropTypes from '../../lib/prop-types';
import { getStores } from '../../lib/data';
import Layout from '../../components/layout';
import CheckBonusesForm from '../../components/check-bonuses-form';

export default function BonusesPage({ storeCode, stores }) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Сколько у меня бонусов?">
      <CheckBonusesForm/>
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
    },
    revalidate: 10,
  };
}

BonusesPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  storeCode: PropTypes.string.isRequired,
};
