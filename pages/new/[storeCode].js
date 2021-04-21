import PropTypes from '../../lib/prop-types';
import { getProductsPageServerSideProps } from '../../lib/server-side-props';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

export default function NewPage({
  storeCode,
  stores,
  products,
  pagination,
  filters,
}) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Новинки">
      <ProductList
        products={products}
        pagination={pagination}
        filters={filters}
        placeholderText="К сожалению сейчас новинок нет, но они обязательно скоро появятся."
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return getProductsPageServerSideProps(query, { is_new: true });
}

NewPage.propTypes = {
  storeCode: PropTypes.string.isRequired,
  stores: PropTypes.stores.isRequired,
  products: PropTypes.products.isRequired,
  pagination: PropTypes.pagination.isRequired,
  filters: PropTypes.filters.isRequired,
};
