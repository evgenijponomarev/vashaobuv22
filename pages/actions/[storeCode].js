import proptypes from '../../lib/proptypes';
import { getStores } from '../../lib/data';
import Layout from '../../components/layout';
import ProfitLink from '../../components/profit-link';

export default function Actions({ stores }) {
  return (
    <Layout stores={stores} title="Акции">
      <ProfitLink/>
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

export async function getStaticProps() {
  return {
    props: {
      stores: getStores(),
    },
    revalidate: 10,
  };
}

Actions.propTypes = {
  stores: proptypes.stores.isRequired,
};
