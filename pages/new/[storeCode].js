import proptypes from '../../lib/proptypes';
import { getStores, getProducts } from '../../lib/data';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

export default function New({ stores, products, pagination }) {
  return (
    <Layout stores={stores}>
      <ProductList
        products={products}
        pagination={pagination}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { storeCode, page } = query;
  const isNew = true;

  return {
    props: {
      stores: getStores(),
      ...getProducts(storeCode, page, { isNew }),
    },
  };
}

New.propTypes = {
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
};
