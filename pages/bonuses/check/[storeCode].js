import PropTypes from '../../../lib/prop-types';
import { getStores } from '../../../lib/data';
import Layout from '../../../components/layout';
import CheckBonusesForm from '../../../components/check-bonuses-form';

export default function CheckBonusesPage({ storeCode, stores }) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Сколько у меня бонусов?">
      <CheckBonusesForm/>
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

CheckBonusesPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  storeCode: PropTypes.string.isRequired,
};
