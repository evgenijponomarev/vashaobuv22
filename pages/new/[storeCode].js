import proptypes from '../../lib/proptypes';
import { getStores, getProducts } from '../../lib/data';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';
import Pagination from '../../components/pagination';

export default function New({ stores, products, pagination }) {
  return (
    <Layout stores={stores}>
      <ProductList products={products}/>

      <Pagination pagination={pagination}/>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      stores: getStores(),
      ...getProducts(query),
    },
  };
}

New.propTypes = {
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
};
