import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/layout';
import AdminUploadForm from '../../components/admin-upload-form';

export default function AdminData() {
  return (
    <Layout title="Загрузка данных" isAdmin>
      <AdminUploadForm
        action="/api/data"
        fieldName="1s_dump"
      />
    </Layout>
  );
}
