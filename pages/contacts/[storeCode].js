import PropTypes from '../../lib/prop-types';
import { getStores, getContacts, getStorePhotos } from '../../lib/data';
import Layout from '../../components/layout';
import Contacts from '../../components/contacts';

export default function ContactsPage({
  storeCode,
  stores,
  contacts,
  photos,
}) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Контакты">
      {contacts && <Contacts address={contacts.address} map={contacts.map} photos={photos}/>}
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
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      storeCode: params.storeCode,
      stores: getStores(),
      contacts: getContacts(params.storeCode),
      photos: getStorePhotos(params.storeCode),
    },
    revalidate: 10,
  };
}

ContactsPage.defaultProps = {
  contacts: null,
  photos: [],
};

ContactsPage.propTypes = {
  stores: PropTypes.stores.isRequired,
  storeCode: PropTypes.string.isRequired,
  contacts: PropTypes.contacts,
  photos: PropTypes.photos,
};
