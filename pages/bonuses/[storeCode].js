import PropTypes from '../../lib/prop-types';
import { getStores } from '../../lib/data';
import Layout from '../../components/layout';
import BonusProgramDescription from '../../components/bonus-program-description';
import BonusProgramLink from '../../components/bonus-program-link';

export default function BonusesPage({ storeCode, stores }) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Бонусная программа">
      <BonusProgramDescription/>

      <BonusProgramLink storeCode={storeCode}/>
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
    revalidate: 3,
  };
}

BonusesPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  storeCode: PropTypes.string.isRequired,
};
