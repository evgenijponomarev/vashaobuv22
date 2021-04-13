import proptypes from '../../lib/proptypes';
import { getProductsPageServerSideProps } from '../../lib/server-side-props';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

export default function New({
  storeCode,
  stores,
  products,
  pagination,
  filters,
}) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Выгодные предложения">
      <ProductList products={products} pagination={pagination} filters={filters}/>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return getProductsPageServerSideProps(query, { extra_bonus: true });
}

New.propTypes = {
  storeCode: proptypes.string.isRequired,
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
  filters: proptypes.filters.isRequired,
};
