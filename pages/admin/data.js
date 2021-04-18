import PropTypes from '../../lib/prop-types';
import apiHelpers from '../../lib/api-helpers';
import Layout from '../../components/layout';
import AdminUploadForm from '../../components/admin-upload-form';

const API_URL = '/api/data';

export default function AdminDataPage({ apiPassword }) {
  return (
    <Layout title="Загрузка данных" isAdmin>
      <AdminUploadForm
        action={API_URL}
        fieldName="1s_dump"
        hiddenFields={[
          {
            key: 'apiPassword',
            value: apiPassword,
          },
        ]}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      apiPassword: apiHelpers.createPassword(),
    },
  };
}

AdminDataPage.propTypes = {
  apiPassword: PropTypes.string.isRequired,
};
