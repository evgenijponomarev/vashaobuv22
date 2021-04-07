import proptypes from '../../lib/proptypes';
import {
  getStores,
  getProductsPageData,
  getProductsFilters,
} from '../../lib/data';
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
      <ProductList
        products={products}
        pagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const isNew = true;
  const { storeCode, page } = query;
  const stores = getStores();
  const { products, pagination } = getProductsPageData(storeCode, page, { isNew });
  const filters = getProductsFilters(storeCode, { isNew });

  return {
    props: {
      stores,
      products,
      pagination,
      filters,
    },
  };
}

New.propTypes = {
  stores: proptypes.stores.isRequired,
  products: proptypes.products.isRequired,
  pagination: proptypes.pagination.isRequired,
  filters: proptypes.filters.isRequired,
};
