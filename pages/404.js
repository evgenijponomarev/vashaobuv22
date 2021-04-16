import PropTypes from '../lib/prop-types';
import { getStores } from '../lib/data';
import Layout from '../components/layout';

export default function Page404({ stores }) {
  return (
    <Layout
      stores={stores}
      pathname="/new/[storeCode]"
      title="Страница не найдена"
    />
  );
}

export async function getStaticProps() {
  return {
    props: {
      stores: getStores(),
    },
    revalidate: 10,
  };
}

Page404.propTypes = {
  stores: PropTypes.stores.isRequired,
};
