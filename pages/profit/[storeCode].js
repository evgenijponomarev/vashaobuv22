import proptypes from '../../lib/proptypes';
import { getProductsPageServerSideProps } from '../../lib/server-side-props';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

export default function New({
  stores,
  products,
  pagination,
  filters,
}) {
  return (
    <Layout stores={stores}>
      <ProductList products={products} pagination={pagination} filters={filters}/>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return getProductsPageServerSideProps(query, { extra_bonus: true });
}

New.propTypes = {
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
  filters: proptypes.filters.isRequired,
};
