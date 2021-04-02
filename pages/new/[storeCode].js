import { useRouter } from 'next/router';
import Data from '../../lib/data';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';
import Pagination from '../../components/pagination';

export default function New({ storeCode, stores = [], products = [] }) {
  const router = useRouter();
  const currentRoute = router.asPath;
  const currentStoreCode = router.query.storeCode || '';

  return (
    <Layout stores={stores}>
      <ProductList
        products={products.map(product => ({
          ...product,
          url: `/new/${currentStoreCode}/${product.code}`,
        }))}
      />

      {/* <Pagination
        pagesCount={pagesCount}
        currentPageNum={}
        onChangePage={pageNum => setPageList(getPageList(pageNum))}
      /> */}
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const data = new Data(query);

  return {
    props: {
      storeCode: query.storeCode,
      stores: data.getStores(),
      products: data.getProducts(),
    },
  };
}
