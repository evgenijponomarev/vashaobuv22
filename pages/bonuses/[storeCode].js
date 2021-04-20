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

export async function getServerSideProps({ query }) {
  return {
    props: {
      storeCode: query.storeCode,
      stores: getStores(),
    },
  };
}

BonusesPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  storeCode: PropTypes.string.isRequired,
};
