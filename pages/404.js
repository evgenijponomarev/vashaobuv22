import PropTypes from '../lib/prop-types';
import { getStores } from '../lib/data';
import Layout from '../components/layout';
import Message404 from '../components/message404';

export default function Page404({ stores }) {
  return (
    <Layout
      stores={stores}
      pathname="/new/[storeCode]"
      title="Страница не найдена"
    >
      <Message404/>
    </Layout>
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

Page404.propTypes = {
  stores: PropTypes.stores.isRequired,
};
