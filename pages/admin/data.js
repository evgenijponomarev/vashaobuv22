import initializeBasicAuth from 'nextjs-basic-auth';
import Layout from '../../components/layout';
import AdminUploadForm from '../../components/admin-upload-form';
import users from '../../secret/users.json';

const API_URL = '/api/data';

const basicAuthCheck = initializeBasicAuth({
  users: [
    users.find(({ user }) => user === 'admin'),
  ],
});

export default function AdminData() {
  return (
    <Layout title="Загрузка данных" isAdmin>
      <AdminUploadForm
        action={API_URL}
        fieldName="1s_dump"
      />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await basicAuthCheck(req, res);

  return {
    props: {},
  };
}
