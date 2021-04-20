import PropTypes from '../lib/prop-types';
import { getStores } from '../lib/data';
import Layout from '../components/layout';

export default function Home({ stores }) {
  return (
    <Layout
      stores={stores}
      pathname="/new/[storeCode]"
    />
  );
}

export async function getStaticProps() {
  return {
    props: {
      stores: getStores(),
    },
    revalidate: 3,
  };
}

Home.propTypes = {
  stores: PropTypes.stores.isRequired,
};
