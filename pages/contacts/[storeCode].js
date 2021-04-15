import proptypes from '../../lib/proptypes';
import { getStores } from '../../lib/data';
import Layout from '../../components/layout';
import Contacts from '../../components/contacts';

export default function ContactsPage({ storeCode, stores }) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Контакты">
      <Contacts/>
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

ContactsPage.propTypes = {
  stores: proptypes.stores.isRequired,
  storeCode: proptypes.string.isRequired,
};
