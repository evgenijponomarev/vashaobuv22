import PropTypes from '../../lib/prop-types';
import { getProductsPageServerSideProps } from '../../lib/server-side-props';
import Layout from '../../components/layout';
import ProductList from '../../components/product-list';

export default function ProfitPage({
  storeCode,
  stores,
  products,
  pagination,
  filters,
}) {
  return (
    <Layout storeCode={storeCode} stores={stores} title="Выгодные предложения">
      <ProductList
        products={products}
        pagination={pagination}
        filters={filters}
        placeholderText={(
          <>
            <p>
              В настоящий момент все наши предложения одинаково выгодны,
              и нам нечего выделить среди них.
            </p>

            <p>Но в ближайшее время здесь появится что-то особенное — не пропустите!</p>
          </>
        )}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return getProductsPageServerSideProps(query, { extra_bonus: true });
}

ProfitPage.propTypes = {
  storeCode: PropTypes.string.isRequired,
  stores: PropTypes.stores.isRequired,
  products: PropTypes.products.isRequired,
  pagination: PropTypes.pagination.isRequired,
  filters: PropTypes.filters.isRequired,
};
