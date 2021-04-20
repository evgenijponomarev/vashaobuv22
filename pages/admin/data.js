import Layout from '../../components/layout';
import AdminUploadForm from '../../components/admin-upload-form';

const API_URL = '/api/data';

export default function AdminDataPage() {
  return (
    <Layout title="Загрузка данных" isAdmin>
      <AdminUploadForm
        action={API_URL}
        fieldName="data"
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
